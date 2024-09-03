import {StepperQuestion} from '@components/atoms/StepperQuestion';
import Colors from '@constants/colors';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import OptionItem from './components/OptionItem';
import PopupConfirm from './components/PopupConfirm';
import {MCQScreenProp} from '.';
import usePTNBankSoalScreen from '../PTNBankSoalScreen/usePTNBankSoalScreen';
import {Option} from '@services/lpt/type';
import ToastResult from './components/ToastResult';
import NextPrevButton from './components/NextPrevButton';
import {apiPost} from '@api/wrapping';
import provider from '@services/ptn/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import RobotClose from '@assets/svg/Robot_close.svg';
import RobotGembira from '@assets/svg/robot_gembira.svg';
import {parseHtml} from '@constants/functional';
import {MainView} from '@components/atoms';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';

const BankSoal: React.FC<MCQScreenProp> = props => {
  const {navigation} = props;
  const {questionData, questionDiscuss, getListQuestion, postStartPractice} =
    usePTNBankSoalScreen();
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [toastResult, setToastResult] = useState<{
    status: boolean;
    type: 'correct' | 'incorrect' | null;
    discussion: string;
    answer?: string;
    exactAnswer?: string;
    showAnswer?: boolean;
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

  const scrollRef = useRef<ScrollView | null>(null);

  let number_of_attempts: 1;

  const tempQuesAnswer = useRef([]);

  const onClose = () => {
    props.setShowPopUp(prevState => ({...prevState, status: false}));
  };

  const onCloseToastResult = () => {
    setToastResult(prevState => ({...prevState, status: false}));
  };

  const handleNextPrevButton = (direction: 'next' | 'previous') => {
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
    setCurrentQuestion(prevState =>
      direction === 'next' ? prevState + 1 : prevState - 1,
    );
    setToastResult(prevState => ({...prevState, status: false}));
  };

  const onLeave = async () => {
    try {
      navigation.pop();
    } catch (e) {}
  };

  const onKumpulkan = async () => {
    const body = {
      module: props?.module,
      subject_id: props?.subject_id,
      subject_name: props?.subject_name,
      question_answer: tempQuesAnswer?.current,
    };

    try {
      const data = await apiPost({
        url: provider.postSubmitPractice(),
        body: body,
      });

      var module: String = data?.module;

      navigation.replace('ResultScreen', {
        serviceType: 'PTN',

        subTitle: `${module.toUpperCase()} • ${data?.subject}`,
        questionServiceId: 15, // PTN_BANK_SOAL
        duration: `${data?.duration} menit`,
        points: data?.point,
        correctAnswer: data?.correct_answer,
        wrongAnswer: data?.wrong_answer,
        historyId: data?.practice_user_history_id,
        subjectId: props?.subject_id,
      });
    } catch (errorMessage: any) {
      Toast.show({
        type: 'error',

        text1: errorMessage || 'Error',
      });
    }
  };

  const onStudentAnswer = (ans: Option, indexAnswer: number) => {
    let data = [...studentAnswer];
    let dataAnswer = [...answer];
    data[currentQuestion - 1] = {
      ...data[currentQuestion - 1],
      [`${indexAnswer}`]: ans,
    };
    dataAnswer[currentQuestion - 1] = ans;

    let dataKey = Object.keys(data[currentQuestion - 1]);

    if (ans.is_correct) {
      setResultQuestion(prevState => ({
        ...prevState,
        correct: [...prevState.correct, currentQuestion - 1],
      }));
    } else if (!ans.is_correct) {
      setResultQuestion(prevState => ({
        ...prevState,
        incorrect: [...prevState.incorrect, currentQuestion - 1],
      }));
    }
    if (dataKey?.length === number_of_attempts) {
      setToastResult({
        status: true,
        type: ans.is_correct ? 'correct' : 'incorrect',
        discussion: `${questionDiscuss.current}`,
      });
    } else {
      setToastResult({
        status: true,
        type: ans.is_correct ? 'correct' : 'incorrect',
        discussion: `${questionDiscuss.current}`,
      });
    }
    setStudentAnswer(data);

    if (ans.is_correct || dataKey?.length === number_of_attempts) {
      setAnswer(dataAnswer);
    }
  };

  const setTempAnswer = () => {
    let tempQuesId: any[] = [];
    questionData.map((item: any) => {
      tempQuesId.push({id: item.id});
    });

    tempQuesAnswer.current = [...(tempQuesId as never)];
  };

  useEffect(() => {
    setTempAnswer();
  }, [questionData]);

  useEffect(() => {
    postStartPractice(props?.subject_id as number);
    getListQuestion(props?.subject_id as number);
  }, []);

  if (questionData.length === 0) {
    return <MainView flex={1} backgroundColor={Colors.white} />;
  }
  return (
    <View style={styles.container}>
      <StepperQuestion
        onPressQuestion={val => setCurrentQuestion(val)}
        currentQuestion={currentQuestion}
        totalQuestion={questionData?.length}
        question={resultQuestion}
      />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.svContentContainer}>
        <View style={styles.labelQuestionContainer}>
          <Text style={styles.labelQuestion}>PERTANYAAN</Text>
          <Text style={styles.labelQuestion}>
            Bobot: {questionData?.[currentQuestion - 1]?.marks}
          </Text>
        </View>
        {questionData?.[currentQuestion - 1]?.instructions ? (
          <RenderHtmlView
            baseStyle={{color: Colors.black}}
            contentWidth={Dimensions.get('screen').width - 32}
            source={{
              html: parseHtml(
                questionData?.[currentQuestion - 1]?.instructions,
              ),
            }}
          />
        ) : null}
        <RenderHtmlView
          baseStyle={{color: Colors.black}}
          contentWidth={Dimensions.get('screen').width - 32}
          imgTableTagStyle={{
            maxHeight: WINDOW_HEIGHT * 0.05,
            maxWidth: WINDOW_WIDTH,
          }}
          source={{
            html: parseHtml(questionData?.[currentQuestion - 1]?.question),
          }}
        />
        <View style={styles.optionContainer}>
          {questionData?.[currentQuestion - 1]?.question_options
            ?.sort((a, b) => (a.key! > b.key! ? 1 : a.key! < b.key! ? -1 : 0))
            ?.map((item, index) => {
              item.answer = item?.answer?.replace(
                'margin-bottom: 0;',
                'margin:0;',
              );
              return (
                <OptionItem
                  status={
                    studentAnswer[currentQuestion - 1]?.[index]?.is_correct
                      ? 'correct'
                      : studentAnswer[currentQuestion - 1]?.[index] &&
                        (studentAnswer[currentQuestion - 1]?.[index]
                          ?.is_correct ??
                          true)
                      ? 'incorrect'
                      : null
                  }
                  disabled={
                    studentAnswer[currentQuestion - 1] ||
                    answer[currentQuestion - 1]
                      ? true
                      : false
                  }
                  data={item}
                  key={item.key}
                  onPress={() => {
                    // getQuestionExplanation(item.question_id, item.id);
                    setTimeout(() => onStudentAnswer(item, index), 300);
                    tempQuesAnswer.current.map((temp: any) => {
                      if (temp.id === item.question_id) {
                        temp.option_id = item.id;
                      }
                    });
                  }}
                />
              );
            })}
        </View>
      </ScrollView>
      <NextPrevButton
        handleNextPrevButton={handleNextPrevButton}
        currentQuestion={currentQuestion}
        questionData={questionData}
      />

      <ToastResult
        transparent
        animationType="slide"
        visible={toastResult.status}
        type={toastResult.type}
        discussion={''}
        // discussion={toastResult.discussion}
        exactAnswer={toastResult.exactAnswer}
        answer={toastResult.answer}
        showAnswer={toastResult.showAnswer}
        onRequestClose={onCloseToastResult}
        isTanyaJawab={true}
        onPressNext={
          studentAnswer[currentQuestion - 1] &&
          currentQuestion < questionData?.length
            ? () => handleNextPrevButton('next')
            : undefined
        }
      />
      <PopupConfirm
        show={props.showPopUp.status}
        close={onClose}
        actionCancel={props.showPopUp.type === 'back' ? onLeave : onClose}
        type={props.showPopUp.type}
        actionConfirm={props.showPopUp.type === 'back' ? onClose : onKumpulkan}
        Icon={() =>
          props.showPopUp.type === 'back' ? <RobotClose /> : <RobotGembira />
        }
        title={
          props.showPopUp.type === 'back'
            ? 'Belum Selesai!'
            : 'Siap Dikumpulkan!'
        }
        desc={
          props.showPopUp.type === 'back'
            ? 'Apakah kamu yakin untuk keluar?\nProgresmu tidak akan tersimpan.'
            : `Keren! Kamu berhasil menjawab ${studentAnswer?.length} dari ${questionData?.length} latihan Soal Pilihan Ganda.`
        }
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
    marginTop: 8,
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
  textBookmarkContainer: {flexDirection: 'row', gap: 6, alignItems: 'center'},
  textBookmarkActive: {
    color: Colors.primary.base,
  },
});

export default React.memo(BankSoal);
