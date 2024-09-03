import {IChapterPGQuestionResponseData, Option} from '@services/lpt/type';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {MCQScreenProp} from '.';
import PopupConfirm from './components/PopupConfirm';
import provider from '@services/lpt/provider';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import Colors from '@constants/colors';
import ToastResult from './components/ToastResult';
import OptionItem from './components/OptionItem';
import NextPrevButton from './components/NextPrevButton';
import {AxiosResponse} from 'axios';
import {isStringContains, parseHtml} from '@constants/functional';
import RenderHtmlView from '@components/organism/RenderHtmlView';

const PracticeMCQ: React.FC<MCQScreenProp> = props => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [questionData, setQuestionData] = useState<
    IChapterPGQuestionResponseData[]
  >([]);
  const [startTime] = useState(dayjs());
  const [toastResult, setToastResult] = useState<{
    status: boolean;
    type: 'correct' | 'incorrect' | null;
    discussion: string;
    answer?: string;
    exactAnswer?: string;
    showAnswer?: boolean;
    totalAnswer?: number;
  }>({status: false, type: 'correct', discussion: '', showAnswer: false});
  const [studentAnswer, setStudentAnswer] = useState<{[key: string]: Option}[]>(
    [],
  );
  const [answer, setAnswer] = useState<Option[]>([]);
  const [resultQuestion, setResultQuestion] = useState<{
    correct: number[];
    incorrect: number[];
  }>({
    correct: [],
    incorrect: [],
  });
  const [answeredQIndex, setAnsweredQIndex] = useState<number[]>([]);

  const {route, navigation} = props;
  const {title, subTitle, is_done, question_service_id, chapter_id, rules} =
    route.params;

  const number_of_attempts = rules?.number_of_attempts ?? 1;

  const isLatihanSoalPG = title === 'Latihan Soal PG';

  // const {chapter_id, question_service_id} = route.params;
  const isTanyaJawab = questionData?.[0]?.question_service_type_id === 6;
  const isKuis = isStringContains(props.title || '', 'kuis');

  useEffect(() => {
    const getAllPracticeChapterQuestion = async () => {
      try {
        const res: AxiosResponse<
          IBaseResponseData<IChapterPGQuestionResponseData[]>
        > = await provider.getAllPracticeChapterQuestion(
          chapter_id!,
          question_service_id,
        );
        let sAnswer: any[] = [];
        setQuestionData(res.data?.data ?? []);
        res.data.data?.forEach((_, index) => {
          sAnswer.push({[`${index}-answer`]: {}});
        });
        setStudentAnswer(sAnswer);
      } catch (e) {}
    };

    getAllPracticeChapterQuestion();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCurrentQuestionAnswered = (): boolean => {
    let isIdExist: boolean = true;
    Object.keys(studentAnswer[currentQuestion - 1]).forEach(
      (item: string, index: number) => {
        if (index === 0) {
          isIdExist = !!studentAnswer[currentQuestion - 1]?.[item]?.id;
        }
      },
    );
    return isIdExist;
  };

  const onStudentAnswer = (ans: Option, indexAnswer: number) => {
    let data = [...studentAnswer];
    let answeredQIdx = [...answeredQIndex].filter(
      number => number !== currentQuestion - 1,
    );
    let dataAnswer = [...answer];
    let isIdExist: boolean = true;
    Object.keys(data[currentQuestion - 1]).forEach(
      (item: string, index: number) => {
        if (index === 0) {
          isIdExist = !!data[currentQuestion - 1]?.[item]?.id;
        }
      },
    );
    if (!isIdExist) {
      data[currentQuestion - 1] = {
        [`${indexAnswer}-answer`]: ans,
      };
    } else {
      data[currentQuestion - 1] = {
        ...data[currentQuestion - 1],
        [`${indexAnswer}-answer`]: ans,
      };
    }

    dataAnswer[currentQuestion - 1] = ans;
    answeredQIdx.push(currentQuestion - 1);

    setAnsweredQIndex(answeredQIdx);

    let dataKey = Object.keys(data[currentQuestion - 1]);

    if (ans.is_correct) {
      setResultQuestion(prevState => ({
        ...prevState,
        correct: [...prevState.correct, currentQuestion - 1],
      }));
    } else if (!ans.is_correct && dataKey.length === number_of_attempts) {
      setResultQuestion(prevState => ({
        ...prevState,
        incorrect: [...prevState.incorrect, currentQuestion - 1],
      }));
    }
    if (dataKey?.length === number_of_attempts) {
      const wrongAnswer = dataKey
        ?.filter((item: any) => !data[currentQuestion - 1][item].is_correct)
        .map(itemAnswer => {
          return data[currentQuestion - 1][itemAnswer].key;
        });
      setToastResult({
        status: true,
        type: ans.is_correct ? 'correct' : 'incorrect',
        discussion:
          questionData[currentQuestion - 1]?.question_discuss?.explanation ??
          '',
        answer: wrongAnswer.join(', '),
        showAnswer: dataKey.length === number_of_attempts,
        totalAnswer: dataKey.length,
        exactAnswer: questionData[currentQuestion - 1]?.options?.filter(
          option => option.is_correct,
        )?.[0]?.key,
      });
    } else {
      setToastResult({
        status: true,
        type: ans.is_correct ? 'correct' : 'incorrect',
        discussion: ans.is_correct
          ? questionData[currentQuestion - 1]?.question_discuss?.explanation!
          : 'Kamu masih punya 1 kesempatan lagi untuk menjawab.',
        answer: ans.key,
        totalAnswer: dataKey.length,
        showAnswer: dataKey.length === number_of_attempts,
        exactAnswer: questionData[currentQuestion - 1]?.options?.filter(
          option => option.is_correct,
        )?.[0]?.key,
      });
    }
    setStudentAnswer(data);

    if (!!ans.is_correct || dataKey.length === number_of_attempts) {
      setAnswer(dataAnswer);
    }
  };
  const onSubmitAnswer = async () => {
    var resData;
    try {
      if (!is_done) {
        const res = await provider.practiceTypeProgress({
          chapter_id: route.params.chapter_id!,
          question_service_type_id: route.params.question_service_id!,
        });
        resData = res;
      }
      let data: Datum[] = questionData?.map((ans, index) => {
        let numberOfAttempts = Object.keys(studentAnswer[index])?.length ?? 0;
        let userAnswer =
          Object.keys(studentAnswer[index])
            ?.map(sAnswer => studentAnswer[index][sAnswer]?.key)
            ?.join(', ') ?? undefined;
        let correctAnswer = ans?.options?.filter(option => option.is_correct);
        return {
          id: answer?.[index]?.id,
          question: ans.question,
          answer_user: userAnswer,
          answer_system: correctAnswer?.[0]?.key,
          is_correct: answer?.[index]?.is_correct,
          explanation: ans?.question_discuss?.explanation ?? '',
          number_of_attempts: numberOfAttempts,
          queue: index + 1,
        };
      });
      props.setShowPopUp({status: false, type: 'back'});
      navigation.replace('ResultScreen', {
        duration: `${Math.abs(startTime.diff(dayjs(), 'minute'))} menit`,
        title,
        subTitle,
        data,
        serviceType: 'PRACTICE',
        questionServiceId: question_service_id,
        xpGained: resData?.data?.data?.xp_gained ?? 0,
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
    setCurrentQuestion(prevState =>
      direction === 'next' ? prevState + 1 : prevState - 1,
    );
    setToastResult(prevState => ({...prevState, status: false}));
  };

  const isCorrect = (): boolean | undefined => {
    let isItCorect;
    const isExist = studentAnswer[currentQuestion - 1] ? true : false;
    if (isExist) {
      Object.keys(studentAnswer[currentQuestion - 1] ?? {})?.forEach(
        (element, index) => {
          if (index === 0) {
            isItCorect =
              !!studentAnswer[currentQuestion - 1]?.[element]?.is_correct;
          }
        },
      );
    }
    return isItCorect;
  };

  return (
    <View style={styles.container}>
      <StepperQuestion
        onPressQuestion={val => setCurrentQuestion(val)}
        currentQuestion={currentQuestion}
        totalQuestion={questionData.length}
        question={resultQuestion}
      />
      <ScrollView contentContainerStyle={styles.svContentContainer}>
        <View style={styles.labelQuestionContainer}>
          <Text style={styles.labelQuestion}>PERTANYAAN</Text>
          <Text style={styles.labelMarks}>
            Bobot: {questionData?.[currentQuestion - 1]?.marks ?? 0}
          </Text>
        </View>
        {/* {validateHTMLString(questionData?.[currentQuestion - 1]?.question) ? (
          <RenderHTML
            baseStyle={{color: Colors.black}}
            contentWidth={Dimensions.get('screen').width - 32}
            source={{
              html: parseHtml(
                questionData?.[currentQuestion - 1]?.question as string,
              ),
            }}
          />
        ) : (
          <Text style={styles.textQuestion}>
            {questionData?.[currentQuestion - 1]?.question}.
          </Text>
        )} */}
        <RenderHtmlView
          baseStyle={{color: Colors.black}}
          contentWidth={Dimensions.get('screen').width - 32}
          source={{
            html: parseHtml(
              questionData?.[currentQuestion - 1]?.question as string,
            ),
          }}
        />

        <View style={styles.optionContainer}>
          {questionData?.[currentQuestion - 1]?.options
            ?.sort((a, b) => (a.key! > b.key! ? 1 : a.key! < b.key! ? -1 : 0))
            ?.map((item, index) => {
              item.answer = parseHtml(
                item.answer || '',
                'flex:1; justify-content:center; align-content:center;',
              );
              return (
                <OptionItem
                  status={
                    studentAnswer[currentQuestion - 1]?.[`${index}-answer`]
                      ?.is_correct
                      ? 'correct'
                      : studentAnswer[currentQuestion - 1]?.[`${index}-answer`]
                          ?.id &&
                        (studentAnswer[currentQuestion - 1]?.[`${index}-answer`]
                          ?.is_correct ??
                          true)
                      ? 'incorrect'
                      : null
                  }
                  disabled={
                    (studentAnswer[currentQuestion - 1] &&
                      isCurrentQuestionAnswered() &&
                      Object.keys(studentAnswer[currentQuestion - 1])
                        ?.length === number_of_attempts) ||
                    answer[currentQuestion - 1]?.is_correct
                      ? true
                      : false
                  }
                  contentWidth={Dimensions.get('screen').width - 100}
                  data={item}
                  key={item.key}
                  onPress={() => onStudentAnswer(item, index)}
                />
              );
            })}
        </View>
      </ScrollView>
      {!isLatihanSoalPG && (
        <NextPrevButton
          handleNextPrevButton={handleNextPrevButton}
          currentQuestion={currentQuestion}
          questionData={questionData}
        />
      )}
      <ToastResult
        transparent
        animationType="slide"
        contentWidth={Dimensions.get('screen').width - 30}
        visible={toastResult.status}
        type={toastResult.type}
        discussion={parseHtml(toastResult.discussion)}
        exactAnswer={toastResult.exactAnswer}
        answer={toastResult.answer}
        showAnswer={toastResult.showAnswer}
        isKuis={isKuis}
        onRequestClose={onCloseToastResult}
        isTanyaJawab={isTanyaJawab}
        totalAnswer={toastResult.totalAnswer}
        titleNext={
          studentAnswer[currentQuestion - 1] &&
          Object.keys(studentAnswer[currentQuestion - 1]).length ===
            number_of_attempts &&
          currentQuestion < questionData.length
            ? 'Lanjutkan'
            : !isCorrect()
            ? 'Coba Lagi'
            : undefined
        }
        onPressNext={
          studentAnswer[currentQuestion - 1] &&
          Object.keys(studentAnswer[currentQuestion - 1]).length ===
            number_of_attempts &&
          currentQuestion < questionData.length
            ? () => handleNextPrevButton('next')
            : currentQuestion === questionData.length
            ? undefined
            : isCorrect()
            ? () => handleNextPrevButton('next')
            : () => onCloseToastResult()
        }
      />
      <PopupConfirm
        show={props.showPopUp.status}
        close={onClose}
        type={props.showPopUp.type}
        totalQuestion={questionData.length}
        totalAnsweredQuestion={answeredQIndex.length}
        actionCancel={() => navigation.goBack()}
        actionConfirm={onSubmitAnswer}
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

export default PracticeMCQ;
