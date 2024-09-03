import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useMergeState} from '@constants/functional';
import Maskot8 from '@assets/svg/maskot_8.svg';
import Maskot3 from '@assets/svg/maskot_3.svg';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import provider from '@services/lpt/provider';
import {fetchEssayPractice} from '@redux';
import {SCREEN_NAME} from '@constants/screen';

interface RootState {
  essayPractice: any;
}

const usePractice = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {chapter_id, question_service_id, title, subTitle, is_done}: any =
    route?.params;

  const date = new Date();
  const {essayPractice} = useSelector((state: RootState) => state);
  const essayDataSort = essayPractice?.data?.sort(
    (a: any, b: any) => a.id - b.id,
  );

  let index = 1;
  const arr: any = [];
  let arrStepper: any = [];

  const [state, setState] = useMergeState({
    currentQuestion: 1,
    isShowPopup: false,
    isShowSwipeUp: false,
    popupData: false,
    essayState: arr,
    filledArr: [],
    miliSecondStart: date.getTime(),
  });

  const {
    currentQuestion,
    isShowPopup,
    popupData,
    isShowSwipeUp,
    essayState,
    filledArr,
    miliSecondStart,
  } = state;

  while (index <= essayDataSort?.length || 0) {
    const {id, question, question_discuss} =
      essayDataSort?.[index - 1] ?? false;
    const data = {
      id: id,
      question: question,
      answer_user: '',
      explanation: question_discuss?.explanation,
    };

    arr.push(data);
    index += 1;
  }

  useEffect(() => {
    dispatch(fetchEssayPractice(chapter_id, question_service_id));
  }, [dispatch]);

  let timerId: any;
  const [currentTime, setCurrentTime] = useState(new Date());
  const isFocused = useIsFocused();

  const refreshClock = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    if (isFocused) {
      timerId = setInterval(refreshClock, 1000);
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [isFocused]);

  const _handlerSetAnswer = (text?: any) => {
    let datum = essayState.length === 0 ? arr : essayState;

    const updatedObj = {
      ...datum[currentQuestion - 1],
      answer_user: text || datum[currentQuestion - 1].answer_user || '',
      orders: currentQuestion,
    };

    const updateData = [
      ...datum.slice(0, currentQuestion - 1),
      updatedObj,
      ...datum.slice(currentQuestion),
    ];

    setState({
      essayState: updateData,
    });
    return updateData;
  };

  const _handlerStepper = (text: any) => {
    const isMessageFilled =
      essayState[currentQuestion - 1]?.answer_user?.length > 0;
    const isNextButton = text === 'next';
    const isPreviousButton = text === 'previous';
    _handlerSetAnswer();

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

    setState({
      currentQuestion: isNextButton
        ? currentQuestion + 1
        : isPreviousButton
        ? currentQuestion - 1
        : text,
      filledArr: arrStepper,
    });
  };

  const _handlerOnCloseSwipeUp = () => {
    setState({
      isShowSwipeUp: false,
    });
  };

  const _handlerShowSwipeUp = () => {
    setState({
      isShowSwipeUp: true,
    });
  };

  const _handlerFinishButton = () => {
    const totalAnswerFilled = essayState?.map((value: any) => {
      return value?.answer_user != '';
    });

    setState({
      popupData: {
        icon: Maskot8,
        title: 'Siap Dikumpulkan!',
        description: `Keren! Kamu berhasil menjawab ${
          totalAnswerFilled.filter(Boolean).length
        } dari ${essayDataSort.length} latihan Soal Uraian.`,
        labelConfirm: 'Kumpulkan',
        labelCancel: 'Periksa Ulang',
        onPressConfirm: async () => {
          setState({isShowPopup: false, isDone: true});
          const miliSecondFinish = date.getTime();
          const durationInMiliSeconds = miliSecondFinish - miliSecondStart;
          const durationInSeconds = durationInMiliSeconds / 1000;
          const durationInMinutes = Math.round(durationInSeconds / 60);
          const duration = `${durationInMinutes} Menit`;

          if (!is_done) {
            var responseBackEnd: any = await _handlerOnSubmitAnswer();
          }

          const params = {
            duration: duration,
            title: title,
            subTitle: subTitle,
            questionServiceId: question_service_id,
            serviceType: 'PRACTICE',
            data: _handlerSetAnswer(),
            xpGained: responseBackEnd?.data?.xp_gained || 0,
          };

          navigation.replace(SCREEN_NAME.ResultScreen, params);
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
  };

  const _handlerOnSubmitAnswer = async () => {
    try {
      await provider.practiceTypeProgress({
        chapter_id: chapter_id,
        question_service_type_id: question_service_id,
        is_done: true,
      });
    } catch (e) {}
  };

  return {
    essayDataSort,
    essayState,
    currentQuestion,
    isShowPopup,
    popupData,
    isShowSwipeUp,
    filledArr,
    currentTime,
    _handlerShowSwipeUp,
    _handlerOnCloseSwipeUp,
    _handlerSetAnswer,
    _handlerFinishButton,
    _handlerBackButton,
    _handlerStepper,
  };
};

export default usePractice;
