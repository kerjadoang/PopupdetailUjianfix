import {
  ICheckUnifinishedResponse,
  IDetailQuestionResponse,
  IDetailQuestionResponseData,
  IReviewQuestionResponse,
  ISoalAndAKMSubmitSingleAnswerBody,
  Option,
} from '@services/soal/type';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {MCQScreenProp} from '..';
import PopupConfirm from '../components/PopupConfirm';
import provider from '@services/soal/provider';
import {
  StepperQuestion,
  StepperQuestionProps,
} from '@components/atoms/StepperQuestion';
import Colors from '@constants/colors';
import OptionItem from '../components/OptionItem';
import NextPrevButton from '../components/NextPrevButton';

import Bookmarked from '@assets/svg/ic_marks_active.svg';
import Bookmark from '@assets/svg/ic_marks.svg';
import SadRobot from '@assets/svg/maskot_12.svg';
import ShyRobot from '@assets/svg/maskot_5.svg';

import ReviewQuestion from '../components/ReviewQuestion';
import {Answer} from '@services/soal/type';
import {AxiosResponse} from 'axios';
import dayjs from 'dayjs';
import {parseHtml} from '@constants/functional';
import RenderHtmlView from '@components/organism/RenderHtmlView';

const SoalTestMCQ: React.FC<MCQScreenProp> = props => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [questionData, setQuestionData] =
    useState<IDetailQuestionResponseData>();
  const [answerReviewVisible, setAnswerReviewVisible] =
    useState<boolean>(false);
  const [checkUnfinisedData, setCheckUnfinishedData] =
    useState<ICheckUnifinishedResponse>();
  const [reviewAnswer, setReviewAnswer] = useState<IReviewQuestionResponse>();
  const [alert, setAlert] = useState<boolean>(false);
  const [startTime] = useState(dayjs());
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
  const {route, navigation} = props;
  const {title, subTitle, question_service_id, question_data} = route.params;

  const isBookmarked = questionData?.tagged;
  const answeredId =
    questionData?.question?.options?.filter(option => option.checked)?.[0]
      ?.id ?? '';

  const getDetailQuestion = async (order: any = currentQuestion) => {
    try {
      const res: AxiosResponse<IDetailQuestionResponse> =
        await provider.getDetailQuestion(
          question_data?.data?.package_history_id,
          order,
        );
      setQuestionData(res.data?.data ?? {});
      onCheckUnfinished();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  useEffect(() => {
    getDetailQuestion();
    getReviewQuestion();
    navigation.addListener('beforeRemove', () => {
      props.setShowPopUp(prevState => ({
        ...prevState,
        status: true,
        type: 'back',
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.countDown! < 1) {
      finishTest();
      setAlert(true);
    }
  }, [props.countDown]);

  const finishTest = async () => {
    await provider.finishTest(question_data?.data?.package_history_id);
  };

  const onCheckUnfinished = async () => {
    try {
      const res: AxiosResponse<ICheckUnifinishedResponse> =
        await provider.checkUnfinished(question_data?.data?.package_history_id);
      const ids: number[] = [];
      const idsTagged: number[] = [];
      if (res.data.data?.paused) {
        props.setJeda?.({
          pause: res.data.data?.paused,
          continue: true,
        });
      }
      res.data.data?.answers?.map((answerItem, idx) => {
        if (answerItem.answered) {
          ids.push(idx);
        }
        if (answerItem.tagged) {
          idsTagged.push(idx);
        }
      });
      setAnswer(prevState => ({
        ...prevState,
        resultQuestion: {
          ...prevState.resultQuestion,
          filled: ids,
          bookmarked: idsTagged,
        },
      }));
      setCheckUnfinishedData(res.data);
    } catch (e) {}
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
      let answerBodyData: ISoalAndAKMSubmitSingleAnswerBody = {
        package_history_id: question_data?.data?.package_history_id ?? 0,
        answer: {
          question_id: questionData?.question?.id ?? 0,
          question_option_id: option?.id ?? 0,
          user_input: null,
          status: 'answered',
        },
      };
      await provider.soalAkmAnswerSingle(answerBodyData);
      getDetailQuestion();
      getReviewQuestion();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Terjadi kesalahan');
    }
  };

  const onClose = () => {
    props.setShowPopUp(prevState => ({...prevState, status: false}));
  };

  const handleNextPrevButton = (direction: 'next' | 'previous') => {
    let nextOrder = currentQuestion;
    getDetailQuestion(direction === 'next' ? ++nextOrder : --nextOrder);
    setCurrentQuestion(prevState =>
      direction === 'next' ? prevState + 1 : prevState - 1,
    );
  };

  const onCloseReview = () => {
    setAnswerReviewVisible(false);
  };

  const getReviewQuestion = async () => {
    try {
      const res: AxiosResponse<IReviewQuestionResponse> =
        await provider.getReviewQuestion(
          question_data?.data?.package_history_id,
        );
      setReviewAnswer(res.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const onLeave = async () => {
    try {
      navigation.pop();
      await provider.leaveTest(question_data?.data?.package_history_id);
    } catch (e) {}
  };

  const onPauseResume = async () => {
    try {
      if (!checkUnfinisedData?.data?.paused) {
        await provider.pauseTest(question_data?.data?.package_history_id);
      } else {
        await provider.resumeTest(question_data?.data?.package_history_id);
      }
      onCheckUnfinished();
      props.setJeda?.({
        pause: !checkUnfinisedData?.data?.paused,
        continue: true,
      });
    } catch (e) {}
  };

  const onPressBookmark = async () => {
    try {
      if (isBookmarked) {
        await provider.unstoreQuestionToReview(
          question_data?.data?.package_history_id,
          questionData?.question?.id,
        );
      } else {
        await provider.storeQuestionToReview(
          question_data?.data?.package_history_id,
          questionData?.question?.id,
        );
      }
      getReviewQuestion();
      getDetailQuestion();
    } catch (e) {}
  };

  const onPressReview = () => {
    setAnswerReviewVisible(true);
  };

  return (
    <View style={styles.container}>
      <StepperQuestion
        onPressQuestion={val => {
          getDetailQuestion(val);
          setCurrentQuestion(val);
        }}
        currentQuestion={currentQuestion}
        totalQuestion={questionData?.total_question}
        question={answer.resultQuestion}
      />
      <ScrollView contentContainerStyle={styles.svContentContainer}>
        <View style={styles.labelQuestionContainer}>
          <Text style={styles.labelQuestion}>PERTANYAAN</Text>
          <TouchableOpacity onPress={onPressBookmark}>
            <View style={styles.textBookmarkContainer}>
              {isBookmarked ? <Bookmarked /> : <Bookmark />}
              <Text
                style={[
                  styles.labelMarks,
                  isBookmarked && styles.textBookmarkActive,
                ]}>
                Tandai
              </Text>
            </View>
          </TouchableOpacity>
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
            ?.map((item: IBaseOption) => {
              return (
                <OptionItem
                  status={item.id === answeredId ? 'filled' : null}
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
        pausable
        reviewable
        disableNext={!questionData?.next}
        onPressReview={onPressReview}
        onPressPause={onPauseResume}
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
      <PopupConfirm
        show={props.jeda?.pause}
        title="Berhenti Sejenak"
        desc="Sudah siap untuk kembali
melanjutkan tes?"
        Icon={ShyRobot}
        titleConfirm="Lanjutkan"
        type="done"
        actionConfirm={onPauseResume}
        titleCancel={null}
      />
      <ReviewQuestion
        visible={answerReviewVisible}
        data={reviewAnswer}
        onClose={onCloseReview}
        height={100}
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
  textBookmarkContainer: {flexDirection: 'row', gap: 6, alignItems: 'center'},
  textBookmarkActive: {
    color: Colors.primary.base,
  },
});

export default SoalTestMCQ;
