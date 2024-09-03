import {
  ICheckUnifinishedResponse,
  IDetailQuestionResponse,
  IDetailQuestionResponseData,
  ISoalAndAKMSubmitSingleAnswerBody,
  Option,
} from '@services/soal/type';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {MCQScreenProp} from '..';
import PopupConfirm from '../components/PopupConfirm';
import provider from '@services/soal/provider';
import {
  StepperQuestion,
  StepperQuestionProps,
} from '@components/atoms/StepperQuestion';
import Colors from '@constants/colors';
import ToastResult from '../components/ToastResult';
import OptionItem from '../components/OptionItem';
import NextPrevButton from '../components/NextPrevButton';
import {Answer} from '@services/soal/type';
import {AxiosResponse} from 'axios';

import SadRobot from '@assets/svg/maskot_12.svg';
import dayjs from 'dayjs';
import {parseHtml} from '@constants/functional';
import RenderHtmlView from '@components/organism/RenderHtmlView';

const timerBasedOnLevel = [90000, 180000, 240000];

const SoalKuis: React.FC<MCQScreenProp> = props => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [questionData, setQuestionData] =
    useState<IDetailQuestionResponseData>();
  const [alert, setAlert] = useState<boolean>(false);
  const [startTime] = useState(dayjs());
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);
  const [checkUnfinisedData, setCheckUnfinishedData] =
    useState<ICheckUnifinishedResponse>();
  const [toastResult, setToastResult] = useState<{
    status: boolean;
    type: 'correct' | 'incorrect' | null;
    discussion: string;
    answer?: string;
    exactAnswer?: string;
    showAnswer?: boolean;
  }>({status: false, type: 'correct', discussion: '', showAnswer: false});
  const [answer, setAnswer] = useState<{
    studentAnswer: {[key: string]: Option}[];
    answerBody: Answer[];
    resultQuestion: StepperQuestionProps['question'];
  }>({
    studentAnswer: [],
    answerBody: [],
    resultQuestion: {
      correct: [],
      incorrect: [],
      filled: [],
      skipped: [],
      bookmarked: [],
    },
  });
  const answeredId =
    questionData?.question?.options?.filter(option => option.checked)?.[0]
      ?.id ?? '';

  const {route, navigation} = props;
  const {
    // number_of_attempts,
    title,
    subTitle,
    // question_package_id,
    question_service_id,
    question_data,
    // rules,
  } = route.params;

  // const {chapter_id, question_service_id} = route.params;

  const getDetailQuestion = async (order: any = currentQuestion) => {
    try {
      const res: AxiosResponse<IDetailQuestionResponse> =
        await provider.getDetailQuestion(
          question_data?.data?.package_history_id,
          order,
          {with_answer: true},
        );
      setQuestionData(res.data?.data ?? {});
      onCheckUnfinished();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const onCheckUnfinished = async () => {
    try {
      const res: AxiosResponse<ICheckUnifinishedResponse> =
        await provider.checkUnfinished(question_data?.data?.package_history_id);
      const idsTagged: number[] = [];
      const idsIncorrect: number[] = [];
      const idsCorrect: number[] = [];
      if (res.data.data?.paused) {
        props.setJeda?.({
          pause: res.data.data?.paused,
          continue: true,
        });
      }
      res.data.data?.answers?.map((answerItem, idx) => {
        if (answerItem.tagged) {
          idsTagged.push(idx);
        }
        if (answerItem.correct && answerItem.answered) {
          idsCorrect.push(idx);
        }
        if (!answerItem.correct && answerItem.answered) {
          idsIncorrect.push(idx);
        }
      });
      setAnswer(prevState => ({
        ...prevState,
        resultQuestion: {
          ...prevState.resultQuestion,
          bookmarked: idsTagged,
          incorrect: idsIncorrect,
          correct: idsCorrect,
        },
      }));
      setCheckUnfinishedData(res.data);
    } catch (e) {}
  };

  useEffect(() => {
    getDetailQuestion();
    navigation.addListener('beforeRemove', () => {
      props.setShowPopUp(prevState => ({
        ...prevState,
        status: true,
        type: 'back',
      }));
    });
  }, []);

  //set countdown
  useEffect(() => {
    const timerEnd = new Date(questionData?.quiz_timer_end || '').getTime();
    const timeDiff = timerEnd - new Date().getTime();
    props.setCountDown?.(timeDiff);
  }, [questionData]);

  useEffect(() => {
    if (!isFirstTime) {
      setIsFirstTime(true);
      return;
    }

    if (props.countDown! < 1) {
      if (currentQuestion < (questionData?.total_question ?? 0)) {
        handleNextPrevButton('next');
      } else {
        finishTest();
        setAlert(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.countDown]);

  const finishTest = async () => {
    await provider.finishTest(question_data?.data?.package_history_id);
  };

  const onKumpulkan = async () => {
    try {
      if (props.countDown! < 1) {
        navigation.replace('ResultScreen', {
          title,
          subTitle,
          serviceType: 'SOAL',
          questionServiceId: question_service_id,
          duration: `${Math.abs(startTime.diff(dayjs(), 'minute'))} menit`,
          historyId: question_data?.data?.package_history_id ?? 0,
        });
        return;
      }
      navigation.replace('ResultScreen', {
        title,
        subTitle,
        serviceType: 'SOAL',
        questionServiceId: question_service_id,
        duration: `${Math.abs(startTime.diff(dayjs(), 'minute'))} menit`,
        historyId: question_data?.data?.package_history_id ?? 0,
      });
      await provider.finishTest(question_data?.data?.package_history_id);
    } catch (e) {}
  };

  const onSubmitAnswer = async (option: IBaseOption) => {
    try {
      setToastResult({
        status: true,
        type: option.is_correct ? 'correct' : 'incorrect',
        discussion: questionData?.question?.question_discuss?.explanation ?? '',
        answer: option.key,
        showAnswer: !option.is_correct,
        exactAnswer: questionData?.question?.options?.filter(
          optionItem => optionItem.is_correct,
        )?.[0]?.key,
      });
      let answerBodyData: ISoalAndAKMSubmitSingleAnswerBody = {
        package_history_id: question_data?.data?.package_history_id ?? 0,
        answer: {
          question_id: questionData?.question?.id ?? 0,
          question_option_id: option?.id ?? 0,
          status: 'answered',
        },
      };
      await provider.soalAkmAnswerSingle(answerBodyData);
      getDetailQuestion();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Terjadi kesalahan');
    }
  };

  const onClose = () => {
    props.setShowPopUp(prevState => ({...prevState, status: false}));
  };
  const onCloseToastResult = () => {
    setToastResult(prevState => ({...prevState, status: false}));
  };

  const handleNextPrevButton = (direction: 'next' | 'previous') => {
    let nextOrder = currentQuestion;
    getDetailQuestion(direction === 'next' ? ++nextOrder : --nextOrder);
    setCurrentQuestion(prevState =>
      direction === 'next' ? prevState + 1 : prevState - 1,
    );
    const time =
      timerBasedOnLevel[
        questionData?.question?.question_level_id
          ? questionData?.question?.question_level_id! - 1
          : 0
      ];
    props.setCountDown?.(time);
    setToastResult(prevState => ({...prevState, status: false}));
  };

  const onLeave = async () => {
    try {
      navigation.pop();
      await provider.leaveTest(question_data?.data?.package_history_id);
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <StepperQuestion
        onPressQuestion={val => setCurrentQuestion(val)}
        currentQuestion={currentQuestion}
        totalQuestion={questionData?.total_question}
        question={answer.resultQuestion}
        disabled
      />
      <ScrollView contentContainerStyle={styles.svContentContainer}>
        <View style={styles.labelQuestionContainer}>
          <Text style={styles.labelQuestion}>PERTANYAAN</Text>
        </View>
        {/* {validateHTMLString(questionData?.question?.question) ? (
          <RenderHTML
            contentWidth={Dimensions.get('window').width - 32}
            baseStyle={styles.renderHtmlContainer}
            source={{
              html: parseHtml(questionData?.question?.question || ''),
            }}
          />
        ) : (
          <Text style={styles.textQuestion}>
            {questionData?.question?.question}.
          </Text>
        )} */}
        <RenderHtmlView
          contentWidth={Dimensions.get('window').width - 32}
          baseStyle={styles.renderHtmlContainer}
          source={{
            html: parseHtml(questionData?.question?.question || ''),
          }}
        />

        <View style={styles.optionContainer}>
          {questionData?.question?.options
            ?.sort((a, b) => (a.key! > b.key! ? 1 : a.key! < b.key! ? -1 : 0))
            ?.map(item => {
              return (
                <OptionItem
                  status={
                    item.id === answeredId && item.is_correct
                      ? 'correct'
                      : item.id === answeredId && !item.is_correct
                      ? 'incorrect'
                      : null
                  }
                  disabled={questionData?.answered}
                  data={item}
                  key={item.key}
                  onPress={() => onSubmitAnswer(item)}
                />
              );
            })}
        </View>
      </ScrollView>
      <NextPrevButton
        handleNextPrevButton={handleNextPrevButton}
        currentQuestion={currentQuestion}
        disableNext={!questionData?.next}
        disablePrev
      />
      <ToastResult
        transparent
        animationType="slide"
        visible={toastResult.status}
        type={toastResult.type}
        discussion={toastResult.discussion}
        exactAnswer={toastResult.exactAnswer}
        answer={toastResult.answer}
        showAnswer={toastResult.showAnswer}
        onRequestClose={onCloseToastResult}
        isTanyaJawab
        onPressNext={
          questionData?.next
            ? () => {
                handleNextPrevButton('next');
              }
            : undefined
        }
      />
      <PopupConfirm
        show={props.showPopUp.status}
        close={onClose}
        actionCancel={props.showPopUp.type === 'back' ? onLeave : onClose}
        type={props.showPopUp.type}
        totalAnsweredQuestion={checkUnfinisedData?.data?.answered_count}
        totalQuestion={questionData?.total_question}
        actionConfirm={props.showPopUp.type === 'back' ? onClose : onKumpulkan}
      />
      <PopupConfirm
        show={alert}
        title="Waktu Habis!"
        titleConfirm="Kumpulkan"
        Icon={SadRobot}
        type="done"
        actionConfirm={onKumpulkan}
        totalAnsweredQuestion={checkUnfinisedData?.data?.answered_count}
        totalQuestion={questionData?.total_question}
        titleCancel={null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  svContentContainer: {
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingBottom: 30,
  },
  labelQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  labelQuestion: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.dark.neutral50,
  },
  labelMarks: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.dark.neutral50,
  },
  textQuestion: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginTop: 4,
  },
  optionContainer: {gap: 10, marginTop: 16},
  btnNextPrevContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pressableSize: {width: 48, height: 48},
  btnPrev: {width: 48, height: 48, transform: [{rotateY: '180deg'}]},
  btnNext: {width: 48, height: 48},
  renderHtmlContainer: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral100,
    flex: 1,
  },
});

export default SoalKuis;
