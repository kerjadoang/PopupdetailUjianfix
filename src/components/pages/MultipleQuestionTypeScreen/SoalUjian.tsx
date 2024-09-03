import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SoalScreenProps} from '.';
import {
  useAnswerLMSUjianSingleQuestion,
  useAnsweredLMSUjian,
  useGetLMSUJianSingleQuestionDetail,
  useSubmitLmsUjianWithUUID,
} from '@services/lms';
import {
  ILMSUjianAnswerSingleQuestionPayload,
  ILMSUjianStartResponseData,
} from '@services/lms/type';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
  sleep,
  trimStartEnd,
} from '@constants/functional';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import OptionItem from '../MultipleChoiceQuestionScreen/components/OptionItem';
import {InputText, PopUp} from '@components/atoms';
import NextPrevButton from '../MultipleChoiceQuestionScreen/components/NextPrevButton';
import RobotHappy from '@assets/svg/maskot_2.svg';
import RobotSad from '@assets/svg/maskot_11.svg';
import RobotCry from '@assets/svg/Robot_cry.svg';
import Colors from '@constants/colors';
import dayjs from 'dayjs';
import {
  useCountdownV2Actions,
  useCountdownV2IsFinish,
} from '@zustand/countdownV2';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {sendErrorLog} from '@services/firebase/firebaseDatabase';
import RenderQuestion from './components/RenderQuestion';
import {ResultScreenParam} from 'type/screen';

const SoalUjian: React.FC<SoalScreenProps> = props => {
  const isCountdownFinish = useCountdownV2IsFinish();
  const {setIsPaused: setIsPausedCountdown} = useCountdownV2Actions();
  const {navigation} = props;
  const startData = props.startData as ILMSUjianStartResponseData;
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [isUjianFinished, setIsUjianFinished] = useState<boolean>(false);
  const {data, refetch: getLMSUjianSingleQuestionDetail} =
    useGetLMSUJianSingleQuestionDetail(
      startData?.question_package_id,
      currentQuestion,
      startData?.student_exam?.[0]?.id,
    );
  const {mutate: answerSingleQuestion} = useAnswerLMSUjianSingleQuestion();

  const {refetch: getAnsweredUjian} = useAnsweredLMSUjian();
  const {mutate: submitLMSUjianWithUUID} = useSubmitLmsUjianWithUUID();
  const questionData = data?.data?.question;
  const singleQuestionDetail = data?.data;
  const currentUserInput =
    trimStartEnd(
      singleQuestionDetail?.user_input ||
        singleQuestionDetail?.answer?.user_input ||
        '',
    ) || undefined;

  const [resultQuestion, setResultQuestion] = useState<IResultQuestion>({
    correct: [],
    incorrect: [],
    filled: [],
    skipped: [],
  });

  const questionDetail = questionData ?? {};
  const isPGQuestion =
    questionDetail?.options && questionDetail?.options?.length > 1;
  const isPGKompleks = questionDetail?.question_type_id === 5;
  const isPG = questionDetail?.question_type_id === 1;
  const isWillSubmit = props.showPopUp.type === 'done';

  const [tempAnswerPG, setTempAnswerPG] = useState<IBaseOption>();
  const [tempAnswerPGKomplek, setTempAnswerPGKomplek] = useState<IBaseOption[]>(
    [],
  );
  const [essayInput, setEssayInput] = useState<string | undefined>(undefined);
  const [totalQuestion, setTotalQuestion] = useState<number>();

  //listen when there is an answer in singleQuestionDetail
  useEffect(() => {
    if (essayInput || !currentUserInput || isPGQuestion) {
      return;
    }

    setEssayInput(currentUserInput || undefined);
  }, [currentUserInput]);

  const answeredId =
    tempAnswerPG?.id ??
    data?.data?.question?.options?.filter(
      option => option.id === data?.data?.answer?.selected_options,
    )?.[0]?.id ??
    data?.data?.question?.options?.filter(option =>
      data?.data?.answer?.selected_options_complex?.some(
        item => item === option.id,
      ),
    ) ??
    0;

  //listen when there is an answer in singleQuestionDetail
  useEffect(() => {
    if (!isPGKompleks || tempAnswerPGKomplek.length != 0) {
      return;
    }
    setTempAnswerPGKomplek(answeredId as IBaseOption[]);
  }, [isPGKompleks]);

  const onCloseAlertPopup = () => {
    setIsPausedCountdown(false);
    props.setShowPopUp(prevState => ({...prevState, status: false}));
  };

  const onKumpulkan = async () => {
    onCloseAlertPopup();
    props.setShowAlertTimesUp?.(false);
    try {
      showLoading();
      const res = await submitLMSUjianWithUUID(
        `${startData?.student_exam?.[0]?.id}`,
        props.submitUUID?.uuid!,
      );
      return navigateToResultScreen(res);
    } catch (e: any) {
      showErrorToast('Gagal mengumpulkan ujian. Silahkan coba kembali.', {
        visibilityTime: 2000,
      });
      await sleep(500);
      if (props.showAlertTimesUp) {
        setIsUjianFinished(true);
        await props.putUUID?.();
        props.setShowAlertTimesUp?.(true);
      }

      // return navigateToResultScreen(e);
    } finally {
      dismissLoading();
    }
  };

  const navigateToResultScreen = (res: any) => {
    onCloseAlertPopup();
    props.setShowAlertTimesUp?.(false);
    const screenParams: ResultScreenParam = {
      title: 'Ujian Berhasil Dikumpulkan',
      subTitle: `${startData?.subject?.name} • ${startData?.service?.name}`,
      serviceType: 'UJIAN',
      questionServiceId: startData?.service?.id,
      duration: `${
        res?.data?.duration ??
        Math.abs(dayjs(startData?.start_time).diff(dayjs(), 'minute'))
      } menit`,
      examData: {
        schoolExamScheduleId:
          startData.student_exam?.[0].school_exam_schedule_id,
        studentExamId: startData.student_exam?.[0].id,
      },
      historyId: res?.data?.id,
      //kebutuhan untuk data resultsscreen dari murid kerjakan ujian
      isFromMultipleQuestionTypeScreen: true,
      is_essay: res?.data?.is_essay,
      resultsParam: {
        point: res?.data?.point ?? 0,
        corrects: {
          data: [],
          total: res?.data?.correct ?? 0,
        },
        wrongs: {
          data: [],
          total: res?.data?.wrong ?? res?.data?.wroing ?? 0,
        },
        skips: {
          data: [],
          total: res?.data?.passed ?? 0,
        },
      },
    };
    navigation.replace('ResultScreen', screenParams);
  };

  const swipeUpContentProps = useMemo(() => {
    const isCurrentQuestionAnswered =
      (!!tempAnswerPG || tempAnswerPGKomplek.length != 0 || !!essayInput) &&
      !singleQuestionDetail?.answer?.status;

    const countTotalAnswered =
      (data?.data?.total_answered || 0) + (isCurrentQuestionAnswered ? 1 : 0);
    const resTotalAnswered =
      countTotalAnswered >= (data?.data?.total_question || 1)
        ? data?.data?.total_question
        : countTotalAnswered;
    return {
      countdownConfirm: isWillSubmit ? 3 : 0,
      titleConfirm: isWillSubmit ? 'Kumpulkan' : 'Lanjut',
      titleCancel: isWillSubmit ? 'Periksa Ulang' : 'Keluar',
      title: isWillSubmit ? 'Ujian Siap Dikumpulkan' : 'Belum Selesai!',
      desc: isWillSubmit
        ? `Keren Kamu sudah mengerjakan ${resTotalAnswered} dari ${data?.data?.total_question} soal ${startData?.title}.`
        : 'Apakah kamu yakin untuk keluar? Progresmu tidak akan tersimpan.',
      Icon: isWillSubmit ? RobotHappy : RobotSad,
      actionConfirm: isWillSubmit
        ? () => onKumpulkan()
        : () => onCloseAlertPopup(),
      actionCancel: isWillSubmit
        ? () => onCloseAlertPopup()
        : () => navigation.goBack(),
    };
  }, [
    props.submitUUID,
    data?.data?.total_answered,
    data?.data?.total_question,
    tempAnswerPG,
    essayInput,
    isWillSubmit,
    onKumpulkan,
  ]);

  const swipeUpTimeOutProps = useMemo(() => {
    const isCurrentQuestionAnswered =
      (!!tempAnswerPG || tempAnswerPGKomplek.length != 0 || !!essayInput) &&
      !singleQuestionDetail?.answer?.status;
    const countTotalAnswered =
      (data?.data?.total_answered || 0) + (isCurrentQuestionAnswered ? 1 : 0);
    const resTotalAnswered =
      countTotalAnswered >= (data?.data?.total_question || 1)
        ? data?.data?.total_question
        : countTotalAnswered;
    return {
      countdownConfirm: 3,
      titleConfirm: 'Kumpulkan',
      title: 'Waktu Habis!!',
      desc: `Kamu berhasil menjawab ${resTotalAnswered} dari ${data?.data?.total_question} soal ${startData?.title}.`,
      Icon: RobotCry,
      actionConfirm: () => onKumpulkan(),
      close: false,
    };
  }, [
    props.submitUUID,
    data?.data?.total_answered,
    data?.data?.total_question,
    tempAnswerPG,
    essayInput,
    isWillSubmit,
    onKumpulkan,
  ]);

  const {setShowAlertTimesUp: setShowAlertTimesUpProp} = props;

  useEffect(() => {
    const ifTimesUp = async () => {
      try {
        if (isCountdownFinish) {
          setShowAlertTimesUpProp?.(true);
        } else if (props.showAlertTimesUp) {
          setShowAlertTimesUpProp?.(false);
        }
      } catch (e) {}
    };
    ifTimesUp();
  }, [isCountdownFinish]);

  const onGetAnsweredUjian = async () => {
    try {
      const res = await getAnsweredUjian(startData?.student_exam?.[0]?.id);
      setTotalQuestion(res.data?.length);
      const filledIdxs: number[] = [];
      res.data?.forEach((item: any) => {
        if (item?.answered === true) {
          filledIdxs.push(item?.order - 1);
        }
        setResultQuestion(prevState => ({
          ...prevState,
          filled: filledIdxs,
        }));
      });
    } catch (error) {}
  };

  const saveAnswerAPI = async () => {
    try {
      // showLoading();
      // pg
      if (isPGQuestion && (tempAnswerPG || tempAnswerPGKomplek)) {
        await onSubmitAnswer();
        return;
      }

      // essay
      if (!isPGQuestion && currentUserInput != essayInput) {
        await onStudentAnswerEssay();
        return;
      }
    } catch (error) {
    } finally {
      // dismissLoading();
    }
  };

  const onSubmitAnswer = async (option?: IBaseOption) => {
    if (tempAnswerPG === undefined && tempAnswerPGKomplek.length === 0) {
      return;
    }
    try {
      // showLoading();
      let answerBodyData: ILMSUjianAnswerSingleQuestionPayload = {
        answer: [
          {
            question_id:
              questionData?.id ??
              tempAnswerPG?.question_id ??
              tempAnswerPGKomplek?.[0]?.question_id ??
              0,
            question_options_id: isPG ? option?.id ?? tempAnswerPG?.id : null,
            question_options_complex_id: isPGKompleks
              ? tempAnswerPGKomplek?.map(val => val?.id)
              : null,
            user_input: '',
            status: 'answered',
          },
        ],
      };
      await answerSingleQuestion(
        startData?.student_exam?.[0]?.id ?? 0,
        answerBodyData,
      );
    } catch (e) {
    } finally {
      // dismissLoading();
    }
  };

  const onStudentAnswerEssay = async (text?: string) => {
    if (essayInput === undefined) {
      return;
    }
    try {
      const userInput = text || essayInput || '';
      // if student answer is blank do nothing
      if (!userInput) {
        return;
      }
      // if student answer is same with api user input do nothing
      if (singleQuestionDetail?.user_input == userInput) {
        return;
      }
      let answerBodyData: ILMSUjianAnswerSingleQuestionPayload = {
        answer: [
          {
            question_id: questionData?.id ?? 0,
            question_options_id: null,
            user_input: userInput,
            status: 'answered',
          },
        ],
      };

      await answerSingleQuestion(
        startData?.student_exam?.[0]?.id ?? 0,
        answerBodyData,
      );
    } catch (e) {}
  };

  const refetchData = async () => {
    try {
      showLoading();
      await Promise.all([
        getLMSUjianSingleQuestionDetail(),
        // await onGetSummaryUjian(),
        onGetAnsweredUjian(),
      ]);
    } catch (error: any) {
      sendErrorLog({
        feature: 'lms_ujian',
        serviceName: 'LMS',
        type: 'ERROR',
        message: error.toString(),
        screenName: 'multipleQuestionTypeScreen',
        title: 'refetchData',
      });
    } finally {
      dismissLoading();
    }
  };

  const handleNextPrevButton = (direction: 'next' | 'previous') => {
    if (isCountdownFinish) {
      props.setShowAlertTimesUp?.(true);
      return;
    }
    setCurrentQuestion(prevState =>
      direction === 'next' ? prevState + 1 : prevState - 1,
    );
  };

  //handle save answer then get next/prev question
  useAsyncEffect(async () => {
    showLoading();
    await Promise.all([
      await saveAnswerAPI(),
      // reset input
      setTempAnswerPG(undefined),
      setTempAnswerPGKomplek([]),
      setEssayInput(undefined),

      await refetchData(),
    ]);
    dismissLoading();
  }, [currentQuestion]);

  return (
    <View style={styles.container}>
      <StepperQuestion
        onPressQuestion={val =>
          isUjianFinished || isCountdownFinish
            ? props.setShowAlertTimesUp?.(true)
            : setCurrentQuestion(val)
        }
        currentQuestion={currentQuestion}
        totalQuestion={totalQuestion ?? data?.data?.total_question}
        question={resultQuestion}
      />

      <ScrollView contentContainerStyle={styles.svContentContainer}>
        <RenderQuestion
          imageUrl={questionDetail?.path_url}
          question={questionDetail?.question}
          bobot={questionDetail?.marks}
        />

        {isPGQuestion ? (
          <View style={styles.optionContainer}>
            {questionDetail?.options
              ?.sort((a, b) => (a.key! > b.key! ? 1 : a.key! < b.key! ? -1 : 0))
              ?.map((item: IBaseOption, idx) => {
                item.answer = item?.answer?.replace(
                  'margin-bottom: 0;',
                  'margin: 0;',
                );

                return (
                  <OptionItem
                    status={
                      (
                        isPG
                          ? answeredId === item.id
                          : tempAnswerPGKomplek.length > 0
                          ? tempAnswerPGKomplek.some(ans => ans.id === item.id)
                          : (answeredId as IBaseOption[]).some?.(
                              (ans: any) => ans?.id === item?.id,
                            ) || false
                      )
                        ? 'filled'
                        : undefined
                    }
                    data={item}
                    imageUrl={item.path_url || item.file_id}
                    responseKey="answer"
                    key={idx}
                    onPress={() =>
                      isUjianFinished || isCountdownFinish
                        ? props.setShowAlertTimesUp?.(true)
                        : isPG
                        ? setTempAnswerPG(item)
                        : setTempAnswerPGKomplek(state =>
                            state?.pushOrRemove(item, {
                              customCondition: data => data.id === item.id,
                            }),
                          )
                    }
                    isPGKomplek={isPGKompleks}
                    isChecked={
                      tempAnswerPGKomplek.length > 0
                        ? tempAnswerPGKomplek.some(ans => ans.id === item.id)
                        : (answeredId as IBaseOption[]).some?.(
                            (ans: any) => ans?.id === item?.id,
                          ) || false
                    }
                    onPressCheck={() =>
                      isUjianFinished
                        ? props.setShowAlertTimesUp?.(true)
                        : setTempAnswerPGKomplek(state =>
                            state?.pushOrRemove(item, {
                              customCondition: data => data.id === item.id,
                            }),
                          )
                    }
                  />
                );
              })}
          </View>
        ) : (
          <InputText
            multiline
            bottom={16}
            isNotOutline
            borderRadius={10}
            value={essayInput || ''}
            inputTextStyle={{height: 120}}
            placeholder={'Tulis jawabanmu di sini...'}
            onChangeText={
              text => setEssayInput(text)
              // onStudentAnswerEssay()
            }
          />
        )}
      </ScrollView>
      <NextPrevButton
        handleNextPrevButton={param =>
          isUjianFinished
            ? props.setShowAlertTimesUp?.(true)
            : handleNextPrevButton(param)
        }
        currentQuestion={currentQuestion}
        // disableNext={!data?.data?.next}
        disableNext={currentQuestion === totalQuestion}
      />
      <PopUp
        show={props.showPopUp.status}
        close={onCloseAlertPopup}
        onPopupShow={() => {
          saveAnswerAPI();
        }}
        {...swipeUpContentProps}
      />
      <PopUp
        show={props.showAlertTimesUp}
        onPopupShow={() => {
          saveAnswerAPI();
        }}
        // close={() => props.setShowAlertTimesUp?.(false)}
        {...swipeUpTimeOutProps}
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
  imageContainer: {
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
    marginVertical: 16,
  },
  optionContainer: {gap: 10, marginTop: 16},
});

export default SoalUjian;
