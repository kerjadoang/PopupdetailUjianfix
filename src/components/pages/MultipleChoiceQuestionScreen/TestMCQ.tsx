import {
  IKPTestQuestionResponse,
  IKPTestQuestionResponseData,
  ISubmitQuestionSinglePayload,
  ITestMCQBody,
  Option,
} from '@services/lpt/type';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {MCQScreenProp} from '.';
import PopupConfirm from './components/PopupConfirm';
import provider from '@services/lpt/provider';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import Colors from '@constants/colors';
import OptionItem from './components/OptionItem';
import NextPrevButton from './components/NextPrevButton';

import SadRobot from '@assets/svg/maskot_12.svg';
import {AxiosResponse} from 'axios';
import dayjs from 'dayjs';
import {dismissLoading, parseHtml, showLoading} from '@constants/functional';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import RenderHtmlView from '@components/organism/RenderHtmlView';

const TestMCQ: React.FC<MCQScreenProp> = props => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [questionData, setQuestionData] =
    useState<IKPTestQuestionResponseData>();

  const [alert, setAlert] = useState<boolean>(false);
  const [answer, setAnswer] = useState<ISubmitQuestionSinglePayload['answer']>(
    [],
  );
  const [startTime] = useState(dayjs());
  const [resultQuestion, setResultQuestion] = useState<{
    correct: number[];
    incorrect: number[];
    filled: number[];
    skipped: number[];
  }>({
    correct: [],
    incorrect: [],
    filled: [],
    skipped: [],
  });
  const totalAnsweredQuestion = answer.filter(ans => ans.question_options_id);

  const {route, navigation} = props;
  const {title, subTitle, rules, chapter_id, question_service_id, level_id} =
    route.params;

  const isAdaptif = QUESTION_SERVICE_TYPE.TEST_ADAPTIF === question_service_id;
  const isSkippable = !rules?.cannot_skip;
  const objectKey = isAdaptif ? 'question_levels' : 'questions';

  const answeredId =
    questionData?.[objectKey]?.[currentQuestion - 1]?.options?.filter(
      option =>
        option.id ===
        (questionData?.[objectKey]?.[currentQuestion - 1]
          ?.question_options_id ?? 0),
    )?.[0]?.id ?? '';
  const currQuestionData = questionData?.[objectKey]?.[currentQuestion - 1];

  const getAllTestTypeQuestion = async () => {
    try {
      const res: AxiosResponse<IKPTestQuestionResponse> =
        await provider.getAllTestTypeQuestion(
          chapter_id!,
          question_service_id,
          level_id,
        );
      let data = res.data?.data ?? {};
      const level_1 = data.adaptif_question?.level_1
        ? data.adaptif_question?.level_1.slice?.(0, 4)
        : [];
      const level_2 = data.adaptif_question?.level_2
        ? data.adaptif_question?.level_2.slice?.(0, 3)
        : [];
      const level_3 = data.adaptif_question?.level_3
        ? data.adaptif_question?.level_3.slice?.(0, 3)
        : [];
      data.question_levels = [...level_1, ...level_2, ...level_3];
      if (isAdaptif) {
        setQuestionData(data);
      } else {
        setQuestionData(data ?? {});
      }

      const filledAndSkipped: number[] = [];

      data?.[objectKey]?.forEach((itemData, index) => {
        if (isAdaptif) {
          if (itemData.status === 'answered') {
            filledAndSkipped.push(index);
          }
        } else if (itemData.status === 'answered') {
          filledAndSkipped.push(index);
        }
      });

      setResultQuestion(prevState => ({
        ...prevState,
        filled: filledAndSkipped,
        skipped: isAdaptif ? [] : filledAndSkipped,
      }));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  useEffect(() => {
    getAllTestTypeQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      questionData?.questions ||
      (questionData?.question_levels ?? [])?.length > 0
    ) {
      let newData: ITestMCQBody['answer'] = [
        ...questionData?.[objectKey]!,
      ]?.map(qData => {
        return {
          question_id: isAdaptif ? qData.id! : qData.question_id!,
          question_options_id: qData.question_options_id,
          status: 'pass',
        };
      });
      setAnswer(newData);
    }
  }, [questionData]);

  useEffect(() => {
    if (props.countDown! < 1) {
      setAlert(true);
    }
  }, [props.countDown]);

  const onStudentAnswer = (ans: Option) => {
    let dataAnswer = [...answer];

    dataAnswer[currentQuestion - 1].question_options_id = ans.id!;
    dataAnswer[currentQuestion - 1].status = 'answered';

    setResultQuestion(prevState => ({
      ...prevState,
      filled: [...prevState.filled, currentQuestion - 1],
    }));

    setAnswer(dataAnswer);
    onSubmitSingleQuestion(dataAnswer);
  };
  const onSubmitSingleQuestion = async (
    answerParam?: ISubmitQuestionSinglePayload['answer'],
  ) => {
    try {
      showLoading();
      let testMCQData: ISubmitQuestionSinglePayload = {
        chapter_id,
        question_service_type_id: question_service_id,
        question_service_type_level_id: level_id,
        // test_duration: '10',
        remaining_time: props.minutes ? Number(props.minutes) : 0,
        answer: answerParam?.[currentQuestion - 1]
          ? [answerParam?.[currentQuestion - 1]]
          : [answer[currentQuestion - 1]],
      };
      await provider.submitSingleQuestionTest(testMCQData);
      await getAllTestTypeQuestion();
    } catch (e) {
    } finally {
      dismissLoading();
    }
  };

  const onExitTest = async () => {
    await onSubmitAnswer();
    props.setShowPopUp(prevState => ({...prevState, status: false}));
    navigation.pop();
  };

  const onSubmitAnswer = async () => {
    try {
      let testMCQData: ISubmitQuestionSinglePayload = {
        chapter_id,
        question_service_type_id: question_service_id,
        question_service_type_level_id: level_id,
        // test_duration: '10',
        remaining_time: props.minutes ? Number(props.minutes) : 0,
        answer: [],
      };
      const res = await provider.submitQuestionAnswerTest(testMCQData);

      setAlert(false);

      navigation.replace('ResultScreen', {
        title,
        subTitle,
        historyId: res.data?.data?.id,
        duration: `${Math.abs(startTime.diff(dayjs(), 'minute'))} menit`,
        serviceType: 'TEST',
        questionServiceId: question_service_id,
        passAnswer: res?.data?.data?.pass_answer,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const onClose = () => {
    props.setShowPopUp(prevState => ({...prevState, status: false}));
  };

  const handleNextPrevButton = (direction: 'next' | 'previous') => {
    if (isAdaptif && direction !== 'previous') {
      setResultQuestion(prevState => ({
        ...prevState,
        skipped: [...prevState.skipped, currentQuestion - 1],
        filled: [...prevState.filled, currentQuestion - 1],
      }));
    }
    setCurrentQuestion(prevState =>
      direction === 'next' ? prevState + 1 : prevState - 1,
    );
  };

  return (
    <View style={styles.container}>
      <StepperQuestion
        onPressQuestion={val => setCurrentQuestion(val)}
        currentQuestion={currentQuestion}
        totalQuestion={questionData?.[objectKey]?.length}
        question={resultQuestion}
        disabled={!isSkippable}
      />
      <ScrollView contentContainerStyle={styles.svContentContainer}>
        <View style={styles.labelQuestionContainer}>
          <Text style={styles.labelQuestion}>PERTANYAAN</Text>
          <Text style={styles.labelMarks}>
            Bobot:{' '}
            {questionData?.[objectKey]?.[currentQuestion - 1]?.marks ?? 0}
          </Text>
        </View>
        {/* {validateHTMLString(
          questionData?.[objectKey]?.[currentQuestion - 1]?.question,
        ) ? (
          <RenderHTML
            contentWidth={Dimensions.get('screen').width - 32}
            source={{
              html: parseHtml(
                questionData?.[objectKey]?.[currentQuestion - 1]
                  ?.question as string,
              ),
            }}
          />
        ) : (
          <Text style={styles.textQuestion}>
            {questionData?.[objectKey]?.[currentQuestion - 1]?.question}.
          </Text>
        )} */}
        {/*<Text style={styles.textQuestion}>
          {questionData?.[objectKey]?.[currentQuestion - 1]?.question}
        </Text>*/}
        <RenderHtmlView
          contentWidth={Dimensions.get('screen').width - 32}
          source={{
            html: parseHtml(
              questionData?.[objectKey]?.[currentQuestion - 1]
                ?.question as string,
            ),
          }}
        />

        <View style={styles.optionContainer}>
          {questionData?.[objectKey]?.[currentQuestion - 1]?.options
            ?.sort((a, b) => (a.key! > b.key! ? 1 : a.key! < b.key! ? -1 : 0))
            ?.map((item: IBaseOption) => {
              item.answer = parseHtml(item?.answer || '');
              const isDisabled =
                (resultQuestion.skipped.includes(currentQuestion - 1) ||
                  !!currQuestionData?.status) &&
                isAdaptif;
              return (
                <OptionItem
                  contentWidth={Dimensions.get('screen').width - 100}
                  status={item.id === answeredId ? 'filled' : null}
                  data={item}
                  key={item.key}
                  disabled={isDisabled}
                  disabledStyle={isDisabled}
                  onPress={() => onStudentAnswer(item)}
                />
              );
            })}
        </View>
      </ScrollView>
      <NextPrevButton
        handleNextPrevButton={handleNextPrevButton}
        currentQuestion={currentQuestion}
        questionData={questionData?.[objectKey]}
      />
      <PopupConfirm
        show={props.showPopUp.status}
        close={onClose}
        actionCancel={props.showPopUp.type === 'back' ? onExitTest : onClose}
        type={props.showPopUp.type}
        totalAnsweredQuestion={totalAnsweredQuestion?.length}
        totalQuestion={questionData?.[objectKey]?.length}
        actionConfirm={
          props.showPopUp.type === 'back' ? onClose : onSubmitAnswer
        }
      />
      <PopupConfirm
        show={alert}
        title="Waktu Habis!"
        titleConfirm="Kumpulkan"
        Icon={SadRobot}
        type="done"
        actionConfirm={onSubmitAnswer}
        totalAnsweredQuestion={totalAnsweredQuestion?.length}
        totalQuestion={questionData?.[objectKey]?.length}
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

export default TestMCQ;
