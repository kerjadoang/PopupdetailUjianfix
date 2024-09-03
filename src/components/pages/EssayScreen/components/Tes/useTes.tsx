import {useEffect, useState} from 'react';
import {rdxDispatch, useMergeState} from '@constants/functional';
import Maskot8 from '@assets/svg/maskot_8.svg';
import Maskot3 from '@assets/svg/maskot_3.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SCREEN_NAME} from '@constants/screen';
import provider from '@services/lpt/provider';
import {useCountdown} from '@hooks/useCountdown';
import {BackHandler} from 'react-native';
import {SaveAnswerType, saveAnswerAction} from '@redux';

const useTes = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const {chapter_id, question_service_id, title, subTitle}: any = route?.params;

  const date = new Date();

  let index = 1;
  const arr: any = [];
  let arrStepper: any = [];

  const [state, setState] = useMergeState({
    isLoading: false,
    currentQuestion: 1,
    isShowPopup: false,
    popupData: false,
    essayState: arr,
    filledArr: [],
    miliSecondStart: date.getTime(),
    isPaused: false,
    isContinue: false,
    essayTestQuestion: false,
  });

  const {
    isLoading,
    currentQuestion,
    isShowPopup,
    popupData,
    essayState,
    filledArr,
    miliSecondStart,
    isPaused,
    isContinue,
    essayTestQuestion,
  } = state;

  const essayDataSort = essayTestQuestion?.questions;

  const {question} = essayDataSort?.[currentQuestion - 1] || '-';

  while (index <= essayDataSort?.length) {
    const {question_id} = essayDataSort?.[index - 1] ?? false;
    const data = {
      question_id: question_id,
      question_options_id: null,
      user_input: '',
      status: 'pass',
    };

    arr.push(data);
    index += 1;
  }

  const {rules}: any = route?.params || false;

  const [dateRules] = useState(
    new Date().setMinutes(new Date().getMinutes() + rules?.max_duration),
  );

  const {minutes, seconds, countDown} = useCountdown(
    dateRules,
    isPaused,
    isContinue,
  );
  const displayTime = minutes + ':' + seconds;

  useEffect(() => {
    _handlerGetQuestion();

    BackHandler.addEventListener('hardwareBackPress', _handlerBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', _handlerBackButton);
    };
  }, []);

  const _handlerGetQuestion = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.getAllTestTypeQuestionEssay(
        chapter_id,
        question_service_id,
      );
      var resDataData = res?.data?.data || false;

      if (resDataData) {
        if (resDataData?.questions) {
          const usersArray = resDataData?.questions?.map(
            (_: any, index: any) => {
              resDataData.questions[index].user_input =
                resDataData?.questions?.[index].user_input?.length > 0
                  ? resDataData?.questions?.[index].user_input
                  : '';

              resDataData.questions[index].status =
                resDataData?.questions?.[index].user_input?.length > 0
                  ? 'answered'
                  : 'pass';
            },
          );

          Promise.all(usersArray);
        }

        setTimeout(() => {
          setState({
            isLoading: false,
            essayTestQuestion: resDataData,
          });
        }, 500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e) {
      setTimeout(() => {
        setState({
          isLoading: false,
        });
      }, 500);
    }
  };

  useEffect(() => {
    if (countDown < 1) {
      if (rules?.max_duration) {
        const totalAnswerFilled = essayState?.map((value: any) => {
          return value?.user_input != '';
        });

        setState({
          popupData: {
            icon: Maskot8,
            title: 'Waktu Habis!',
            description: `Keren! Kamu berhasil menjawab ${
              totalAnswerFilled.filter(Boolean)?.length
            } dari ${essayDataSort?.length} tes ${title}.`,
            labelConfirm: 'Kumpulkan',
            onPressConfirm: async () => {
              setState({isShowPopup: false, isDone: true});
              const miliSecondFinish = date.getTime();
              const minuteFinish = Math.round(miliSecondFinish / 1000 / 60);
              const minuteStart = Math.round(miliSecondStart / 1000 / 60);
              const durationInMiliSeconds = miliSecondFinish - miliSecondStart;
              const durationInSeconds = durationInMiliSeconds / 1000;
              const durationInMinutes = Math.round(durationInSeconds / 60);
              const duration = `${durationInMinutes} Menit`;
              const minuteEndTime =
                minuteStart + parseInt(essayTestQuestion?.duration, 10);
              const minuteRemainingTime = minuteEndTime - minuteFinish;

              const paramsBackend = {
                chapter_id: chapter_id,
                question_service_type_id: question_service_id,
                question_service_type_level_id: null,
                test_duration: `${durationInMinutes}`,
                remaining_time: minuteRemainingTime,
                answer: essayState,
              };

              const responseBackEnd = await _handlerOnSubmitAnswer(
                paramsBackend,
              );

              const paramsNextScreen = {
                duration: duration,
                title: title,
                subTitle: subTitle,
                questionServiceId: question_service_id,
                historyId: responseBackEnd?.data?.id,
                serviceType: 'TEST',
                xpGained: responseBackEnd?.data?.xp_gained || 0,
              };

              navigation.replace(SCREEN_NAME.ResultScreen, paramsNextScreen);
            },
          },
          isShowPopup: true,
        });
      } else {
        setState({isShowPopup: false, isDone: true, isContinue: false});
      }
    }
  }, [countDown]);

  const _handlerSetAnswer = (text: any) => {
    let datum = essayState?.length === 0 ? arr : essayState;

    const updatedObj = {
      ...datum[currentQuestion - 1],
      user_input: text,
      status: text?.length > 0 ? 'answered' : 'pass',
    };

    const updateData = [
      ...datum.slice(0, currentQuestion - 1),
      updatedObj,
      ...datum.slice(currentQuestion),
    ];

    setState({
      essayState: updateData,
    });
  };

  const _handlerSaveAnswer = () => {
    const saveAnswer: SaveAnswerType = {
      questionId: essayState[currentQuestion - 1]?.question_id,
      question: question,
      userAnswer: essayState[currentQuestion - 1]?.user_input,
      status: essayState[currentQuestion - 1]?.status,
      questionOptionsId: essayState[currentQuestion - 1]?.question_options_id,
    };
    // save answer to redux
    rdxDispatch(saveAnswerAction(saveAnswer));
  };

  const _handlerStepper = async (text: any) => {
    const isMessageFilled =
      essayState[currentQuestion - 1]?.user_input?.length > 0;
    const isNextButton = text === 'next';
    const isPreviousButton = text === 'previous';
    _handlerSaveAnswer();

    if (!arrStepper.includes(currentQuestion - 1)) {
      if (isMessageFilled) {
        arrStepper.push(...filledArr, currentQuestion - 1);
      } else {
        arrStepper = filledArr.filter?.(
          (idx: number) => idx !== currentQuestion - 1,
        );
      }
    } else if (!isMessageFilled) {
      arrStepper = filledArr.filter?.(
        (idx: number) => idx !== currentQuestion - 1,
      );
    }

    const miliSecondFinish = date.getTime();
    const minuteFinish = Math.round(miliSecondFinish / 1000 / 60);
    const minuteStart = Math.round(miliSecondStart / 1000 / 60);
    const durationInMiliSeconds = miliSecondFinish - miliSecondStart;
    const durationInSeconds = durationInMiliSeconds / 1000;
    const durationInMinutes = Math.round(durationInSeconds / 60);
    const minuteEndTime =
      minuteStart + parseInt(essayTestQuestion?.duration, 10);
    const minuteRemainingTime = minuteEndTime - minuteFinish;

    const paramsBackend = {
      chapter_id: chapter_id,
      question_service_type_id: question_service_id,
      question_service_type_level_id: null,
      test_duration: `${durationInMinutes}`,
      remaining_time: minuteRemainingTime > 0 ? minuteRemainingTime : 0,
      answer: [essayState[currentQuestion - 1]],
    };

    if (essayState?.length != 0) {
      await _handlerOnSingleSubmitAnswer(paramsBackend);
    }

    setState({
      currentQuestion: isNextButton
        ? currentQuestion + 1
        : isPreviousButton
        ? currentQuestion - 1
        : text,
      filledArr: arrStepper,
    });
  };

  const _handlerFinishButton = () => {
    const totalAnswerFilled = essayState?.map((value: any) => {
      return value?.user_input != '';
    });

    _handlerSaveAnswer();

    setState({
      popupData: {
        icon: Maskot8,
        title: 'Siap Dikumpulkan!',
        description: `Keren! Kamu berhasil menjawab ${
          totalAnswerFilled.filter(Boolean)?.length
        } dari ${essayDataSort?.length} tes ${title}.`,
        labelConfirm: 'Kumpulkan',
        labelCancel: 'Periksa Ulang',
        onPressConfirm: async () => {
          setState({isShowPopup: false, isDone: true, isPaused: true});
          const miliSecondFinish = date.getTime();
          const minuteFinish = Math.round(miliSecondFinish / 1000 / 60);
          const minuteStart = Math.round(miliSecondStart / 1000 / 60);
          const durationInMiliSeconds = miliSecondFinish - miliSecondStart;
          const durationInSeconds = durationInMiliSeconds / 1000;
          const durationInMinutes = Math.round(durationInSeconds / 60);
          const duration = `${durationInMinutes} Menit`;
          const minuteEndTime =
            minuteStart + parseInt(essayTestQuestion?.duration, 10);
          const minuteRemainingTime = minuteEndTime - minuteFinish;

          const paramsBackend = {
            chapter_id: chapter_id,
            question_service_type_id: question_service_id,
            question_service_type_level_id: null,
            test_duration: `${durationInMinutes}`,
            remaining_time: minuteRemainingTime,
            answer: essayState,
          };

          const responseBackEnd = await _handlerOnSubmitAnswer(paramsBackend);

          const paramsNextScreen = {
            duration: duration,
            title: title,
            subTitle: subTitle,
            questionServiceId: question_service_id,
            historyId: responseBackEnd?.data?.data?.id,
            serviceType: 'TEST',
            xpGained: responseBackEnd?.data?.data?.xp_gained || 0,
          };
          navigation.replace(SCREEN_NAME.ResultScreen, paramsNextScreen);
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
        },
      },
      isShowPopup: true,
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
          setState({isShowPopup: false});
          navigation.goBack();
        },
      },
      isShowPopup: true,
    });

    return true;
  };

  const _handlerOnSingleSubmitAnswer = async (params: any) => {
    try {
      const res = await provider.submitSingleTestEssayAnswer(params);
      return res;
    } catch (e) {}
  };

  const _handlerOnSubmitAnswer = async (params: any) => {
    try {
      const res = await provider.submitTestEssayAnswer(params);
      return res;
    } catch (e) {}
  };

  return {
    isLoading,
    essayDataSort,
    essayState,
    currentQuestion,
    isShowPopup,
    popupData,
    filledArr,
    seconds,
    displayTime,
    countDown,
    _handlerSetAnswer,
    _handlerFinishButton,
    _handlerBackButton,
    _handlerStepper,
  };
};

export default useTes;
