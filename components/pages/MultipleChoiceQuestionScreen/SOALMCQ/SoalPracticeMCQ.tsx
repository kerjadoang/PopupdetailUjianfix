import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {MCQScreenProp} from '..';
import PopupConfirm from '../components/PopupConfirm';
import provider from '@services/soal/provider';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import Colors from '@constants/colors';
import ToastResult from '../components/ToastResult';
import OptionItem from '../components/OptionItem';
import NextPrevButton from '../components/NextPrevButton';
import {
  ICheckUnifinishedResponse,
  IDetailQuestionResponse,
  IDetailQuestionResponseData,
  ISoalAndAKMSubmitSingleAnswerBody,
} from '@services/soal/type';
import {AxiosResponse} from 'axios';
import dayjs from 'dayjs';
import {parseHtml} from '@constants/functional';
import RenderHtmlView from '@components/organism/RenderHtmlView';

const SoalPracticeMCQ: React.FC<MCQScreenProp> = props => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [questionData, setQuestionData] =
    useState<IDetailQuestionResponseData>();
  const [startTime] = useState(dayjs());
  const [toastResult, setToastResult] = useState<{
    status: boolean;
    type: 'correct' | 'incorrect' | null;
    discussion: string;
    answer?: string;
    exactAnswer?: string;
    showAnswer?: boolean;
  }>({status: false, type: 'correct', discussion: ''});
  const [numberOfAttempts, setNumberOfAttempts] = useState<number[]>([]);
  const [checkUnfinisedData, setCheckUnfinishedData] =
    useState<ICheckUnifinishedResponse>();
  const [resultQuestion, setResultQuestion] = useState<{
    correct: number[];
    incorrect: number[];
  }>({
    correct: [],
    incorrect: [],
  });

  const {route, navigation} = props;
  const {
    number_of_attempts,
    title,
    subTitle,
    question_service_id,
    question_data,
  } = route.params;

  const answeredId =
    questionData?.question?.options?.filter(option => option.checked)?.[0]
      ?.id ?? '';

  const getDetailQuestion = async (order: any = currentQuestion) => {
    try {
      const res: AxiosResponse<IDetailQuestionResponse> =
        await provider.getDetailQuestion(
          question_data?.data?.package_history_id,
          order,
          {with_answer: true},
        );
      setQuestionData(res.data?.data ?? {});
      let nOfAttempts: number[] = [];
      if (numberOfAttempts.length === 0) {
        for (let i = 0; i < res.data.data?.total_question!; i++) {
          nOfAttempts.push(number_of_attempts ?? 1);
        }
        setNumberOfAttempts(nOfAttempts);
      }
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
      const idsIncorrect: number[] = [];
      const idsCorrect: number[] = [];
      if (res.data.data?.paused) {
        props.setJeda?.({
          pause: res.data.data?.paused,
          continue: true,
        });
      }
      res.data.data?.answers?.map((answerItem, idx) => {
        if (answerItem.correct && answerItem.answered) {
          idsCorrect.push(idx);
        }
        if (!answerItem.correct && answerItem.answered) {
          idsIncorrect.push(idx);
        }
      });
      setResultQuestion(prevState => ({
        ...prevState,
        incorrect: idsIncorrect,
        correct: idsCorrect,
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

  const onKumpulkan = async () => {
    try {
      await provider.finishTest(question_data?.data?.package_history_id);
      navigation.replace('ResultScreen', {
        title,
        subTitle,
        serviceType: 'SOAL',
        questionServiceId: question_service_id,
        duration: `${Math.abs(startTime.diff(dayjs(), 'minute'))} menit`,
        historyId: question_data?.data?.package_history_id ?? 0,
      });
    } catch (e) {}
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
    setToastResult(prevState => ({...prevState, status: false}));
  };

  const onSubmitAnswer = async (option: IBaseOption) => {
    try {
      setToastResult({
        status: true,
        type: option.is_correct ? 'correct' : 'incorrect',
        discussion: questionData?.question?.question_discuss?.explanation ?? '',
        answer: option.key,
        showAnswer:
          !option.is_correct && numberOfAttempts[currentQuestion - 1] < 2,
        exactAnswer: questionData?.question?.options?.filter(
          optionItem => optionItem.is_correct,
        )?.[0]?.key,
      });
      let nOfAttempts = [...numberOfAttempts];
      nOfAttempts[currentQuestion - 1] = nOfAttempts[currentQuestion - 1] - 1;
      setNumberOfAttempts(nOfAttempts);
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
        question={resultQuestion}
        disabled
      />
      <ScrollView contentContainerStyle={styles.svContentContainer}>
        <View style={styles.labelQuestionContainer}>
          <Text style={styles.labelQuestion}>PERTANYAAN</Text>
          <Text style={styles.labelMarks}>
            Bobot: {questionData?.question?.marks ?? 0}
          </Text>
        </View>
        {/* {validateHTMLString(questionData?.question?.question) ? (
          <RenderHTML
            baseStyle={{color: Colors.black}}
            contentWidth={Dimensions.get('screen').width - 32}
            source={{
              html: parseHtml(questionData?.question?.question as string),
            }}
          />
        ) : (
          <Text style={styles.textQuestion}>
            {questionData?.question?.question}.
          </Text>
        )} */}
        {/* <Text style={styles.textQuestion}>
          {questionData?.question?.question}
        </Text> */}
        <RenderHtmlView
          baseStyle={{color: Colors.black}}
          contentWidth={Dimensions.get('screen').width - 32}
          source={{
            html: parseHtml(questionData?.question?.question as string),
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
                      : questionData.answered &&
                        numberOfAttempts[currentQuestion - 1] < 1 &&
                        item.is_correct
                      ? 'correct'
                      : null
                  }
                  disabled={
                    (questionData.answered && questionData.correct) ||
                    numberOfAttempts[currentQuestion - 1] < 1
                  }
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
        isTanyaJawab={toastResult.showAnswer}
        onPressNext={
          questionData?.next &&
          questionData.answered &&
          numberOfAttempts[currentQuestion - 1] < 1
            ? () => {
                handleNextPrevButton('next');
              }
            : questionData?.next && questionData.answered
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
});

export default SoalPracticeMCQ;
