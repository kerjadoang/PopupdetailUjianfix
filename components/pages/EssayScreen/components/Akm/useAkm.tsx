import {useEffect, useRef, useState} from 'react';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
  useMergeState,
} from '@constants/functional';
import Maskot5 from '@assets/svg/maskot_5.svg';
import Maskot8 from '@assets/svg/maskot_8.svg';
import Maskot3 from '@assets/svg/maskot_3.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import provider from '@services/lms/provider';
import {useCountdownEssay} from '@hooks/useCountDownEssay';
import {SCREEN_NAME} from '@constants/screen';
import {BackHandler, ScrollView} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useAkm = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const {question_service_id, title, subTitle, rules, question_data}: any =
    route?.params;

  const questionDataData = question_data?.data;
  const {package_history_id, end_time, paused, paused_time} = questionDataData;
  const filtterLastAccessed = question_data?.data?.answers?.filter(
    (item: any) => item.last_accessed,
  );
  const lastAccessed = filtterLastAccessed?.[0]?.order;

  const [state, setState] = useMergeState({
    isLoading: false,
    currentQuestion: lastAccessed || 1,
    isShowPopup: false,
    isShowSwipeUpReviewAnswer: false,
    popupData: false,
    isPaused: false,
    isContinue: false,
    questionData: false,
    questionCheckUnfinished: false,
    reviewAnswered: false,
  });

  const {
    isLoading,
    currentQuestion,
    isShowPopup,
    popupData,
    isShowSwipeUpReviewAnswer,
    isPaused,
    isContinue,
    questionData,
    questionCheckUnfinished,
    reviewAnswered,
  } = state;

  const scrollRef = useRef<ScrollView | null>(null);

  const pausedTime = new Date(paused_time);
  const pausedTimeMiliSeconds = pausedTime?.getTime();
  const today = new Date();
  const endTime = new Date(end_time);
  const todayMiliSeconds = today?.getTime();
  const endTimeMiliSeconds = endTime?.getTime();

  const remainingCountDownPaused = endTimeMiliSeconds - pausedTimeMiliSeconds;
  const remainingCountDownPausedInMinutes = Math.round(
    remainingCountDownPaused / 1000 / 60,
  );
  const remainingCountDown = endTimeMiliSeconds - todayMiliSeconds;
  const remainingCountDownInMinutes = Math.round(
    remainingCountDown / 1000 / 60,
  );

  const [dateRules] = useState(
    new Date().setMinutes(
      new Date().getMinutes() +
        (paused
          ? remainingCountDownPausedInMinutes
          : end_time
          ? remainingCountDownInMinutes
          : end_time),
    ),
  );

  const {hours, minutes, seconds, countDown} = useCountdownEssay(
    dateRules,
    isPaused,
    isContinue,
  );

  const displayTime = hours + ':' + minutes + ':' + seconds;

  useEffect(() => {
    _handlerCheckUnfinished();
    _handlerGetQuestion(currentQuestion);

    BackHandler.addEventListener('hardwareBackPress', _handlerBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', _handlerBackButton);
    };
  }, []);

  const _handlerCheckUnfinished = async () => {
    try {
      const res = await provider.getCheckUnfinishedQuestionEssay(
        package_history_id,
      );
      var resDataData = res?.data?.data || false;

      if (resDataData?.paused) {
        _handlerOnPressPause();
      }

      if (resDataData) {
        setState({
          questionCheckUnfinished: resDataData,
        });
      }
    } catch (e) {}
  };

  const _handlerGetQuestion = async (order: number) => {
    setState({isLoading: true});

    try {
      const res = await provider.getNavigateQuestionEssay(
        package_history_id,
        order,
      );
      var resData = res?.data || false;

      if (resData?.data) {
        resData.data.question.user_input =
          resData?.data?.question?.user_input?.length > 0
            ? resData?.data?.question?.user_input
            : '';
        resData.data.question.status =
          resData?.data?.question?.user_input?.length > 0 ? 'answered' : 'pass';

        setState({
          isLoading: false,
          questionData: resData?.data,
        });
      } else {
        setState({
          isLoading: false,
        });
      }
    } catch (e: any) {
      setState({isLoading: false});
    }
  };

  const _handlerOnSubmitAnswer = async () => {
    const {question} = questionData;
    const {user_input, id} = question;

    const params = {
      package_history_id: package_history_id,
      answer: {
        question_id: id,
        question_option_id: null,
        user_input: user_input,
        status: user_input?.length != 0 ? 'answered' : 'pass',
      },
    };

    try {
      await provider.putSubmitAnswerQuestionEssay(params);
    } catch (e) {}
  };

  const _handlerOnSubmitAnsweredForReview = async () => {
    const {question} = questionData;
    const {user_input, id} = question;

    const params = {
      package_history_id: package_history_id,
      answer: {
        question_id: id,
        question_option_id: null,
        user_input: user_input,
        status: user_input?.length != 0 ? 'answered' : 'pass',
      },
    };

    try {
      const res = await provider.putSubmitAnswerQuestionEssay(params);
      var resData = res?.data || false;

      if (resData?.code == 100) {
        _handlerReviewAnswered();
      }
    } catch (e) {}
  };

  const _handlerFinishExam = async () => {
    try {
      showLoading();
      const res = await provider.getFinishQuestionEssay(package_history_id);
      var resData = res?.data || false;

      if (resData?.data) {
        navigation.replace(SCREEN_NAME.ResultScreen, {
          historyId: package_history_id,
          serviceType: 'AKM',
          title: title,
          subTitle: subTitle,
          questionServiceId: question_service_id,
          duration: `${resData?.data?.duration ?? '0'} menit`,
        });
      }
    } catch (e) {
      showErrorToast('Gagal mengumpulkan latihan.');
    } finally {
      dismissLoading();
    }
  };

  const _handlerOnPressPause = async () => {
    try {
      const res = await provider.getPauseQuestionEssay(package_history_id);
      var resData = res?.data || false;
      if (resData?.data) {
        setState({
          popupData: {
            icon: Maskot5,
            title: 'Berhenti Sejenak',
            description: 'Sudah siap untuk kembali melanjutkan tes?',
            labelConfirm: 'Lanjutkan',
            onPressConfirm: () => {
              _handlerOnPressResume();
              setState({isShowPopup: false, isPaused: false, isContinue: true});
            },
          },
          isShowPopup: true,
          isPaused: true,
        });
      }
    } catch (e: any) {
      const errorData = e?.response?.data;
      setState({
        isLoading: false,
      });
      Toast.show({
        type: 'error',
        text1:
          errorData?.message ||
          `Error Code: ${errorData?.code}` ||
          'Internal Server Error',
      });
    }
  };

  const _handlerOnPressResume = async () => {
    try {
      await provider.getResumeQuestionEssay(package_history_id);
    } catch (e) {}
  };

  const _handlerMarksQuestion = async (
    question_id: number,
    isCurrentQuestionAlreadyMarked: boolean,
  ) => {
    try {
      let datum = questionCheckUnfinished;

      if (isCurrentQuestionAlreadyMarked) {
        await provider.getUntagQuestionEssay(package_history_id, question_id);
        datum.answers[currentQuestion - 1].tagged = false;
      } else {
        await provider.getTagQuestionEssay(package_history_id, question_id);
        datum.answers[currentQuestion - 1].tagged = true;
      }

      setState({
        questionCheckUnfinished: datum,
      });
    } catch (e) {}
  };

  const _handlerReviewAnswered = async () => {
    try {
      const res = await provider.getReviewQuestionEssay(package_history_id);
      var resData = res?.data || false;

      setState({
        reviewAnswered: resData?.data || false,
        isShowSwipeUpReviewAnswer: true,
      });
    } catch (e) {}
  };

  const _handlerLeave = async () => {
    try {
      await provider.deleteLeaveQuestionEssay(package_history_id);
    } catch (e) {}
  };

  const _handlerOnChangeAnswer = (text: any) => {
    let datum = questionData;
    let datumCheck = questionCheckUnfinished;

    datum.question.user_input = text;
    datumCheck.answers[currentQuestion - 1].answered = text?.length > 0;

    setState({
      questionData: datum,
    });
  };

  const _handlerStepper = (text: any) => {
    let datum = questionCheckUnfinished;
    let datumQuestion = questionData;
    const isNextButton = text === 'next';
    const isPreviousButton = text === 'previous';
    datum.answers[currentQuestion - 1].answered =
      questionData?.question?.user_input?.length > 0;
    datumQuestion.question.status =
      questionData?.question?.user_input?.length > 0 ? 'answered' : 'pass';
    _handlerOnSubmitAnswer();

    setTimeout(() => {
      if (isNextButton) {
        _handlerGetQuestion(currentQuestion + 1);
      } else if (isPreviousButton) {
        _handlerGetQuestion(currentQuestion - 1);
      } else {
        _handlerGetQuestion(text);
      }

      scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});

      setState({
        currentQuestion: isNextButton
          ? currentQuestion + 1
          : isPreviousButton
          ? currentQuestion - 1
          : text,
        questionCheckUnfinished: datum,
        questionData: datumQuestion,
      });
    }, 100);
  };

  const _handlerOnCloseSwipeUpReviewAnswer = () => {
    setState({
      isShowSwipeUpReviewAnswer: false,
    });
  };

  const _handlerShowSwipeUpReviewAnswer = () => {
    _handlerOnSubmitAnsweredForReview();
  };

  useEffect(() => {
    if (countDown < 1) {
      _handlerOnSubmitAnswer();
      if (rules?.max_duration) {
        let datum = questionCheckUnfinished;
        let datumQuestion = questionData;
        const filterAnswered = questionCheckUnfinished?.answers?.filter(
          (item: any) => item?.answered,
        );
        datum.answers[currentQuestion - 1].answered =
          questionData?.question?.user_input?.length > 0;
        datumQuestion.question.status =
          questionData?.question?.user_input?.length > 0 ? 'answered' : 'pass';

        _handlerOnSubmitAnswer();

        setState({
          popupData: {
            icon: Maskot8,
            title: 'Waktu Habis!',
            description: `Keren! Kamu berhasil menjawab ${
              filterAnswered?.length
            } dari ${questionCheckUnfinished?.total_question} tes ${
              title || '-'
            }.`,
            labelConfirm: 'Kumpulkan',
            onPressConfirm: async () => {
              _handlerFinishExam();
              setState({isShowPopup: false, isDone: true, isContinue: false});

              // navigation.replace(SCREEN_NAME.ResultScreen, paramsNextScreen);
            },
          },
          isShowPopup: true,
          questionCheckUnfinished: datum,
          questionData: datumQuestion,
        });
      } else {
        setState({isShowPopup: false, isDone: true, isContinue: false});
      }
    }
  }, [countDown]);

  const _handlerOnPressFinish = () => {
    let datum = questionCheckUnfinished;
    let datumQuestion = questionData;
    const filterAnswered = questionCheckUnfinished?.answers?.filter(
      (item: any) => item?.answered,
    );

    datum.answers[currentQuestion - 1].answered =
      questionData?.question?.user_input?.length > 0;
    datumQuestion.question.status =
      questionData?.question?.user_input?.length > 0 ? 'answered' : 'pass';

    _handlerOnSubmitAnswer();

    setState({
      popupData: {
        icon: Maskot8,
        title: 'Siap Dikumpulkan!',
        description: `Keren! Kamu berhasil menjawab ${
          filterAnswered?.length
        } dari ${questionCheckUnfinished?.total_question} tes ${title || '-'}.`,
        labelConfirm: 'Kumpulkan',
        labelCancel: 'Periksa Ulang',
        onPressConfirm: async () => {
          _handlerFinishExam();
          setState({isShowPopup: false, isDone: true, isPaused: true});

          // navigation.replace(SCREEN_NAME.ResultScreen, paramsNextScreen);
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
        },
      },
      isShowPopup: true,
      questionCheckUnfinished: datum,
      questionData: datumQuestion,
    });
  };

  const _handlerBackButton = () => {
    setState({
      popupData: {
        icon: Maskot3,
        title: 'Belum Selesai!',
        description:
          'Apakah kamu yakin untuk keluar? Progresmu tidak akan tersimpan.',
        labelConfirm: 'Lanjut Latihan',
        labelCancel: 'Keluar',
        onPressConfirm: () => {
          setState({isShowPopup: false});
        },
        onPressCancel: () => {
          _handlerLeave();
          setState({isShowPopup: false});
          navigation.pop();
        },
      },
      isShowPopup: true,
    });

    return true;
  };

  return {
    isLoading,
    questionData,
    questionCheckUnfinished,
    currentQuestion,
    isShowPopup,
    popupData,
    isShowSwipeUpReviewAnswer,
    seconds,
    displayTime,
    countDown,
    reviewAnswered,
    scrollRef,
    _handlerShowSwipeUpReviewAnswer,
    _handlerOnCloseSwipeUpReviewAnswer,
    _handlerOnPressPause,
    _handlerOnChangeAnswer,
    _handlerMarksQuestion,
    _handlerOnPressFinish,
    _handlerBackButton,
    _handlerStepper,
  };
};

export default useAkm;
