import {MainView, PopUp, SwipeUp} from '@components/atoms';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  PressableProps,
  Image,
  StyleProp,
  ViewStyle,
  Dimensions,
  AppState,
  AppStateStatus,
} from 'react-native';
import {MCQScreenProp} from '../MultipleChoiceQuestionScreen';
import {
  StepperQuestion,
  StepperQuestionProps,
} from '@components/atoms/StepperQuestion';
import PopupConfirm from '../MultipleChoiceQuestionScreen/components/PopupConfirm';
import {
  IAnswerPerTryoutQuestionPayload,
  IStaryTryoutCondition,
  ISubmitTryoutPayload,
  Subject,
  SubjectProgress,
} from '@services/ptn/type';
import {
  useAnswerPerTryoutQuestion,
  useGetTryOutSubjectProgress,
  useGetTryoutQuestion,
  useStartTryoutPerSubject,
  useSubmitTryoutQuestion,
} from '@services/ptn';
import {
  dismissLoading,
  hostEndsWith,
  parseHtml,
  showLoading,
} from '@constants/functional';
import OptionItem from '../MultipleChoiceQuestionScreen/components/OptionItem';
import NextPrevButton from '../MultipleChoiceQuestionScreen/components/NextPrevButton';
import SadRobot from '@assets/svg/maskot_12.svg';
import {ITestMCQBody, Option} from '@services/lpt/type';
import Fonts from '@constants/fonts';
import {SvgUri} from 'react-native-svg';
import RobotDone from '@assets/svg/maskot_8.svg';
import {ParamList} from 'type/screen';
import api from '@api/index';
import HeaderQuestion from '@components/atoms/HeaderQuestion';
import {
  useCountdownV2Actions,
  useCountdownV2IsFinish,
} from '@zustand/countdownV2';
import dayjs from 'dayjs';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';

type ModuleItemProps = {
  data: SubjectProgress;
  selected?: boolean;
  onPress?: PressableProps['onPress'];
  style?: StyleProp<ViewStyle>;
};

const ModuleItem: React.FC<ModuleItemProps> = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        {
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 24,
        },
        props.selected && styles.selectedModule,
        props.style,
      ]}>
      <SvgUri uri={props.data.path_url ?? ''} width={32} height={32} />
      <View style={{flexGrow: 1}}>
        <Text
          style={{
            fontFamily: Fonts.SemiBoldPoppins,
            color: Colors.dark.neutral100,
          }}>
          {props.data.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {!!props.data.total_question_finish && (
            <Text
              style={{
                fontFamily: Fonts.RegularPoppins,
                color: Colors.dark.neutral60,
              }}>
              {props.data.total_question_finish} Terisi
            </Text>
          )}
          <Text
            style={{
              fontFamily: Fonts.RegularPoppins,
              color: Colors.dark.neutral60,
            }}>
            {props.data.total_question_unfinish} Belum Terisi
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

type ResultQuestionV2Props = {
  subjectData: SubjectDataModule;
} & StepperQuestionProps['question'];

const TryoutQuestionScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'TryOutQuestionScreen'>>();
  const route: any = useRoute<RouteProp<ParamList, 'TryOutQuestionScreen'>>();
  const {data, type, title, progressData, nextProgressData} = route.params;
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [tempAnswer, setTempAnswer] = useState<IBaseOption>();
  const {tryout_id, tryout_user_history_id, subject_id} = data;
  const subjectIdIndex = progressData?.findIndex(
    (item: any) => item.id === subject_id,
  );
  const [currentSubjectSelected, setCurrentSubjectSelected] =
    useState<number>(subjectIdIndex);
  const [showModuleNavigation, setShowModuleNavigation] =
    useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [showDone, setShowDone] = useState<boolean>(false);
  const [answer, setAnswer] = useState<{
    studentAnswer: {[key: string]: Option}[];
    answerBody: ITestMCQBody['answer'];
    resultQuestion: StepperQuestionProps['question'];
    resultQuestionV2: ResultQuestionV2Props[];
  }>({
    studentAnswer: [],
    answerBody: [],
    resultQuestion: {
      filled: [],
    },
    resultQuestionV2: [],
  });
  const {data: questionData, refetch} = useGetTryoutQuestion(
    tryout_user_history_id,
    progressData?.[currentSubjectSelected]?.id ?? nextProgressData?.id,
    currentQuestion,
  );
  const currentSubjectData =
    progressData?.[currentSubjectSelected] ?? nextProgressData;
  const [tempProgressData, setTempProgressData] = useState<null[]>([]);
  const [valueAnswered, setValueAnswered] = useState<any>();

  const {mutate: answerQuestion} = useAnswerPerTryoutQuestion();
  const {mutate: startTryoutPerSubject, data: startTryoutPerSubjectData} =
    useStartTryoutPerSubject();
  const {mutate: submitTryout} = useSubmitTryoutQuestion();
  const {mutate: getListSubjectProgress} = useGetTryOutSubjectProgress();

  const scrollRef = useRef<ScrollView | null>(null);
  const totalAnswered = data.answers?.filter(
    (item: any) => item.answered,
  ).length;
  const isTPS = type === 'tps';
  const answeredId = tempAnswer?.id ?? questionData?.data?.question_answer?.id;

  const [showPopUp, setShowPopUp] = useState<MCQScreenProp['showPopUp']>({
    status: false,
    type: 'back',
  });
  const isCountdownFinish = useCountdownV2IsFinish();
  const remain_duration = startTryoutPerSubjectData?.data?.remain_duration;
  const countdownEndTime = dayjs()
    .add(remain_duration || 0, 'minutes')
    .toString();

  const {resetState} = useCountdownV2Actions();
  const currentState = useRef(AppState.currentState);

  useLayoutEffect(() => {
    if (!startTryoutPerSubjectData) {
      return;
    }
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <HeaderQuestion
          label={progressData?.[currentSubjectSelected]?.name ?? 'Try Out'}
          onPressIconRight={async () => {
            try {
              showLoading();
              await saveAnswerAPI();
              if (!isTPS) {
                setShowDone(true);
                return;
              }
              setShowPopUp({status: true, type: 'done'});
            } catch (error) {
            } finally {
              dismissLoading();
            }
          }}
          onPressIconLeft={() => setShowPopUp({status: true, type: 'back'})}
          showCountdown={startTryoutPerSubjectData?.code === 100}
          endTime={countdownEndTime}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    totalAnswered,
    progressData,
    startTryoutPerSubjectData,
    currentSubjectSelected,
    valueAnswered,
    tempAnswer,
  ]);

  useEffect(() => {
    if (remain_duration === 0) {
      setAlert(true);
    }
  }, [remain_duration]);

  const handleAppstate = async (changedState: AppStateStatus) => {
    currentState.current = changedState;
    if (changedState === 'active') {
      await afterSubmitAnswer('start');
      return;
    }

    await afterSubmitAnswer('paused');
  };

  const handleBackButtonPress = () => {
    setShowPopUp(prevState => ({
      ...prevState,
      status: true,
      type: 'back',
    }));
  };

  useAsyncEffect(async () => {
    const handleChangeState = AppState.addEventListener(
      'change',
      handleAppstate,
    );

    navigation.addListener('beforeRemove', handleBackButtonPress);

    return async () => {
      handleChangeState.remove();
      navigation.removeListener('beforeRemove', handleBackButtonPress);
    };
  }, []);

  useAsyncEffect(async () => {
    if (currentSubjectSelected) {
      await refetch();
      await afterSubmitAnswer('start');
    }
  }, [currentSubjectSelected]);

  useAsyncEffect(async () => {
    try {
      if (isCountdownFinish) {
        await saveAnswerAPI();
        setAlert(true);
      }
    } catch (error) {}
  }, [isCountdownFinish]);

  useEffect(() => {
    afterSubmitAnswer('start');
  }, []);

  useEffect(() => {
    const progresSubject: any = tempProgressData?.find(
      (item: any) => item?.name === currentSubjectData?.name,
    );
    setValueAnswered(progresSubject);
  }, [tempProgressData]);

  const onSubmitAnswer = async (option?: IBaseOption) => {
    try {
      // showLoading();
      let answerBodyData: IAnswerPerTryoutQuestionPayload = {
        tryout_user_history_id: tryout_user_history_id!,
        question_id: option?.question_id! ?? tempAnswer?.question_id!,
        question_option_id: option?.id! ?? tempAnswer?.id,
      };
      await answerQuestion(answerBodyData);
      // await refetch();
      // await afterSubmitAnswer();
    } catch (e) {
      // console.log('Terjadi kesalahan');
    } finally {
      // dismissLoading();
    }
  };

  const handlerTempProgressData = async () => {
    const progress = await getListSubjectProgress(tryout_id);
    (progress?.[type]?.subject ?? []).map(async (item: any) => {
      if (item.icon_mobile) {
        const imgRes = await api.get(`/media/v1/image/${item.icon_mobile}`);
        if (imgRes.status === 200 && imgRes.data?.code === 100) {
          item.path_url = imgRes.data?.data?.path_url;
        }
      }
    }),
      setTempProgressData(progress?.[type]?.subject);
  };

  const afterSubmitAnswer = async (tryoutCondition: IStaryTryoutCondition) => {
    handlerTempProgressData();
    const res = await startTryoutPerSubject({
      tryout_user_history_id: tryout_user_history_id!,
      subject_id: currentSubjectData?.id,
      condition: tryoutCondition,
    });
    const idFilled: number[] = [];
    res?.data?.answers?.forEach((answerItem, index) => {
      if (answerItem.answered) {
        const order = answerItem?.order;
        idFilled.push(order ? order - 1 : index);
      }
    });

    const questionAnswer = {
      subjectData: currentSubjectData,
      filled: idFilled,
    };

    const mappedResultQuestion =
      answer.resultQuestionV2?.replaceItem<ResultQuestionV2Props>(
        item => item.subjectData?.id === questionAnswer?.subjectData?.id,
        questionAnswer,
        {pushWhenEmpty: true},
      );

    setAnswer(prevState => ({
      ...prevState,
      resultQuestion: {
        filled: idFilled,
      },
      resultQuestionV2: mappedResultQuestion,
    }));
  };

  const onKumpulkan = async (navigateToScreen = true) => {
    const subjectTPS = [
      {
        id: progressData?.[currentSubjectSelected]?.id,
        name: progressData?.[currentSubjectSelected]?.name,
      },
    ];
    try {
      await saveAnswerAPI(false);
      const subject: Subject[] = isTPS
        ? subjectTPS
        : progressData?.map((item: any) => {
            return {
              id: item?.id,
              name: item?.name,
            };
          });

      const bodyPayload: ISubmitTryoutPayload = {
        tryout_id: startTryoutPerSubjectData?.data?.tryout_id!,
        tryout_user_history_id: tryout_user_history_id!,
        subject,
      };
      const resSubmit = await submitTryout(bodyPayload);

      const resSubject: any = (resSubmit?.data?.subject as [])?.find(
        (item: any) => item?.id === subject_id,
      );

      if (!navigateToScreen) {
        return;
      }

      navigation.replace('ResultScreen', {
        title,
        subTitle: `${type.toUpperCase()} • ${resSubject?.name}`,
        serviceType: 'TRY OUT',
        historyId: tryout_user_history_id,
        subjectId: resSubject?.id,
        is_tryout: true,
        tryOut_answered: valueAnswered?.total_question_finish,
        passAnswer: valueAnswered?.total_question_unfinish,
        duration: `${resSubject?.duration} menit`,
        module: resSubject?.module,
        progressData: progressData,
        isCountdownFinish: isCountdownFinish,
        nextSubjectProgressData: nextProgressData,
      });
    } catch (e: any) {}
  };

  const onLeave = async () => {
    try {
      await afterSubmitAnswer('paused');
      resetState();
      navigation.pop();
    } catch (e) {}
  };

  const onClose = () => {
    setShowPopUp(prevState => ({...prevState, status: false}));
  };

  const handleNextPrevButton = async (direction: 'next' | 'previous') => {
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});

    setCurrentQuestion(prevState =>
      direction === 'next' ? prevState + 1 : prevState - 1,
    );
  };

  const onPressQuestion = async (val: number) => {
    setCurrentQuestion(val);
  };

  const saveAnswerAPI = async (mapAnswer: boolean = true) => {
    if (!tempAnswer) {
      // await getQuestionAfterSubmitAnswer();
      return;
    }
    await onSubmitAnswer();
    setTempAnswer(undefined);

    if (!mapAnswer) {
      return;
    }

    await afterSubmitAnswer('change_question');
  };

  //get question when currentQuestion change
  useAsyncEffect(async () => {
    await saveAnswerAPI();
    refetch();
  }, [currentQuestion]);

  return (
    <View style={styles.container}>
      <StepperQuestion
        onPressQuestion={onPressQuestion}
        currentQuestion={currentQuestion}
        totalQuestion={
          progressData?.[currentSubjectSelected]?.total_question ??
          nextProgressData?.total_question
        }
        question={answer.resultQuestionV2.find(
          item => item.subjectData?.id === currentSubjectData?.id,
        )}
      />
      {questionData ? (
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.svContentContainer}>
          <View style={styles.labelQuestionContainer}>
            <Text style={styles.labelQuestion}>PERTANYAAN</Text>
          </View>
          {questionData?.data?.question?.path_url && (
            <View
              style={{
                width: '100%',
                height: 208,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Image
                source={hostEndsWith(questionData.data?.question?.path_url)}
                style={{width: '100%', height: 208}}
                resizeMode="contain"
              />
            </View>
          )}
          <RenderHtmlView
            source={{
              html: parseHtml(questionData?.data?.question?.question as string),
            }}
            // imgTagStyle={{height: WINDOW_HEIGHT * 0.12}}
            imgTagStyle={{
              marginLeft: 16,
              maxHeight: WINDOW_HEIGHT * 0.15,
              maxWidth: WINDOW_WIDTH - 100,
              alignSelf: 'flex-start',
            }}
            baseStyle={{color: Colors.black}}
            contentWidth={Dimensions.get('screen').width - 32}
          />

          <View style={styles.optionContainer}>
            {questionData?.data?.question?.question_options
              ?.sort((a, b) => (a.key! > b.key! ? 1 : a.key! < b.key! ? -1 : 0))
              ?.map((item: IBaseOption) => {
                item.answer = item.answer?.replace(
                  'margin-bottom: 0;',
                  'margin: 0;',
                );
                return (
                  <OptionItem
                    contentWidth={Dimensions.get('screen').width - 32}
                    status={item.id === answeredId ? 'filled' : null}
                    data={item}
                    key={item.key}
                    onPress={() => {
                      setTempAnswer(item);
                      // return onSubmitAnswer(item);
                    }}
                  />
                );
              })}
          </View>
        </ScrollView>
      ) : (
        <MainView flex={1} />
      )}
      <NextPrevButton
        handleNextPrevButton={handleNextPrevButton}
        currentQuestion={currentQuestion}
        tryOutNavgation={!isTPS}
        onPressTryoutNavigation={() => {
          setShowModuleNavigation(true);
        }}
        disableNext={!questionData?.data?.next}
      />
      <PopupConfirm
        show={showPopUp.status}
        close={onClose}
        actionCancel={showPopUp.type === 'back' ? onLeave : onClose}
        type={showPopUp.type}
        totalAnsweredQuestion={valueAnswered?.total_question_finish}
        totalQuestion={progressData?.[currentSubjectSelected]?.total_question}
        actionConfirm={showPopUp.type === 'back' ? onClose : onKumpulkan}
      />
      <PopUp
        show={showDone}
        close={() => setShowDone(false)}
        additionalContent={
          <FlatList
            data={tempProgressData || progressData}
            style={{maxHeight: 240, alignSelf: 'stretch', marginBottom: 10}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => `${item.id!}`}
            contentContainerStyle={{gap: 8}}
            renderItem={({item}) => (
              <ModuleItem
                data={item}
                style={{backgroundColor: Colors.primary.light4}}
              />
            )}
          />
        }
        Icon={RobotDone}
        title={'Siap Dikumpulkan!'}
        titleCancel={'Periksa Ulang'}
        titleConfirm="Kumpulkan"
        actionCancel={() => setShowDone(false)}
        actionConfirm={onKumpulkan}
      />
      <PopupConfirm
        show={alert}
        title="Waktu Habis!"
        titleConfirm="Kumpulkan"
        Icon={SadRobot}
        type={'done' as any}
        actionConfirm={onKumpulkan}
        totalAnsweredQuestion={valueAnswered?.total_question_finish}
        totalQuestion={progressData?.[currentSubjectSelected]?.total_question}
        titleCancel={null}
        onPopupShow={() => onKumpulkan(false)}
      />
      <SwipeUp
        visible={showModuleNavigation}
        height={100}
        onClose={() => setShowModuleNavigation(false)}>
        <View style={{padding: 16, gap: 16}}>
          <Text
            style={{
              fontFamily: Fonts.SemiBoldPoppins,
              fontSize: 20,
              color: Colors.dark.neutral100,
              textAlign: 'center',
            }}>
            Mata Pelajaran Lainnya
          </Text>
          <FlatList
            data={tempProgressData || progressData}
            style={{maxHeight: 332}}
            keyExtractor={(item: any) => `${item.id!}`}
            renderItem={({item, index}) => (
              <ModuleItem
                data={item}
                onPress={async () => {
                  setShowModuleNavigation(false);
                  showLoading();
                  await saveAnswerAPI();
                  dismissLoading();
                  setCurrentSubjectSelected(index);
                  setCurrentQuestion(1);
                }}
                selected={
                  item.id === progressData?.[currentSubjectSelected]?.id
                }
              />
            )}
          />
        </View>
      </SwipeUp>
    </View>
  );
};

const styles = StyleSheet.create({
  selesaiBtn: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: Colors.success.light1,
    overflow: 'hidden',
  },
  subLabel: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  popableContainer: {
    width: 234,
    borderRadius: 5,
  },
  popableContentContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
  },
  popableText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    color: Colors.danger.base,
  },
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
  selectedModule: {
    borderColor: '#1D4791',
    backgroundColor: '#F5FAFF',
    borderWidth: 2,
  },
});

export default TryoutQuestionScreen;
