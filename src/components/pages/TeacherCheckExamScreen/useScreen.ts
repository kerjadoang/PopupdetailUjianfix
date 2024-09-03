/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {
  deepClone,
  dismissLoading,
  isText,
  parseQuestionType,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {apiGet, apiPost} from '@api/wrapping';
import {INavigation, IRoute, TeacherCheckExamParam} from 'type/screen';
import BottomSheet from '@gorhom/bottom-sheet';
import {useQuery} from '@tanstack/react-query';
import {IScoredLMSUjianResponseData} from '@services/lms/type';

const initMappedStepperQuestion = {
  correct: [],
  incorrect: [],
  filled: [],
  skipped: [],
};

const useScreen = () => {
  const route = useRoute<IRoute<'TeacherCheckExamScreen'>>();
  const navigation = useNavigation<INavigation<'TeacherCheckExamScreen'>>();
  const giveEssayScore = async (order: number, essayPoint: number) => {
    try {
      const res = await apiPost({
        url: URL_PATH.give_essay_score(student_exam_id, order),
        body: {
          essay_point: essayPoint,
        },
      });
      if (currentQuestionData?.point) {
        currentQuestionData.point = essayPoint;
      }

      return res;
    } catch (error) {}
  };

  const getUnscored = async (student_exam_id: number) => {
    try {
      const res = await apiGet({
        url: URL_PATH.unscored_lms_ujian(student_exam_id),
      });

      setUnscored(res);
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    }
  };

  // const { mutateAsync: giveScore, data: scored } = useMutation(giveEssayScore);
  const {
    student_exam_id,
    student_name,
    exam_name,
    mode = 'HISTORY',
    student_paper_id,
  }: TeacherCheckExamParam = route.params;
  const {
    data: ujianData,
    isSuccess,
    isFetched,
    refetch: refetchUjianData,
  } = useQuery<IUjianCheck>({
    queryKey: ['getDetailQuestion', student_paper_id],
    queryFn: async ({}) => {
      showLoading();
      const resData = await apiGet({
        // config: { baseURL: 'https://staging-r25.kelaspintar.dev' },
        url: URL_PATH.get_teacher_exam_history_explanation(student_paper_id),
        // url: URL_PATH.get_teacher_exam_history_explanation("65c090382422a326d650aeb9"),
      });
      dismissLoading();
      return resData;
    },
    refetchOnMount: 'always',
    placeholderData: {},
  });

  const [score, setScore] = useState<any>();
  const [isScored, setIsScored] = useState(false);
  const [studentScore, setStudentScore] = useState();
  // const { checkOneQuestion }: any = useSelector((state: RootState) => state);
  const [ujianExplanationType, setUjianExplanationType] = useState<
    IUjianExplanationType[]
  >([]);
  const [mappedStepperQuestion, setMappedStepperQuestion] =
    useState<IResultQuestion>(initMappedStepperQuestion);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ['12%', '50%'], []);
  const [currentSnapPoints, setCurrentSnapPoints] = useState<String>('15%');
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setCurrentSnapPoints(snapPoints[index]);
  }, []);

  const [popup, setPopup] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [unscored, setUnscored] = useState<IScoredLMSUjianResponseData[]>([]);

  const isShuffleQuestionActive = useMemo(() => {
    setCurrentNumber(1);
    return ujianExplanationType.some(item => item === 'shuffle_question');
  }, [ujianExplanationType]);

  const filteredUjianData = isShuffleQuestionActive
    ? ujianData?.paper?.questions
    : ujianData?.paper?.original_questions;

  const currentQuestionData = filteredUjianData?.[currentNumber - 1];
  const currentQuestionType: IQuestionType = parseQuestionType(
    currentQuestionData?.question_type?.id || 0,
  );

  const isPG = currentQuestionType?.id === 1;
  const isPGKompleks = currentQuestionType?.id === 5;

  const mappingStepperQuestion = () => {
    const newMappedStepperQuestion: IResultQuestion = deepClone(
      initMappedStepperQuestion,
    );

    filteredUjianData?.forEach((item: PaperQuestion, idx: number) => {
      const qType: IQuestionType = parseQuestionType(
        item?.question_type?.id ?? 0,
      );
      //mapping scoring mode
      // if (mode === 'SCORING') {
      if (item?.is_scored && qType.name === 'ESSAY BASE') {
        newMappedStepperQuestion.filled?.push(idx);
        return;
      }
      //   return;
      // }

      // if (mode === 'HISTORY') {
      // if question type is essay append to filled stepper
      if (qType.name === 'ESSAY BASE') {
        // newMappedStepperQuestion.filled?.push(idx);
        return;
      }

      // if question type is mcq and answer is correct append to correct stepper
      if (item?.point !== 0) {
        newMappedStepperQuestion.correct?.push(idx);
        return;
      }

      newMappedStepperQuestion.incorrect?.push(idx);
      return;
      // }
    });

    setMappedStepperQuestion(newMappedStepperQuestion);
  };

  useEffect(() => {
    mappingStepperQuestion();
  }, [isShuffleQuestionActive, isFetched, isSuccess]);

  useEffect(() => {
    getUnscored(student_exam_id);
    if (
      currentQuestionData?.is_scored &&
      currentQuestionType.name === 'ESSAY BASE'
    ) {
      setScore(currentQuestionData?.point);
    }
  }, [currentNumber, isFetched, isSuccess]);

  const updateFilledQuestion = useCallback(async () => {
    if (currentNumber !== ujianData?.paper?.total_question) {
      await refetchUjianData();
    }
    setMappedStepperQuestion(state => ({
      ...state,
      filled: [...(state.filled || []), currentNumber - 1],
    }));
    setIsScored(false);
  }, [currentNumber]);

  const _handlerGiveEssayScore = async () => {
    if (currentQuestionType?.name !== 'ESSAY BASE') {
      return;
    }
    // dispatch(
    //   sendEssayScore(student_exam_id, currentQuestionData?.order || currentNumber, {
    //     essay_point: Number(score),
    //   }, () => {
    //     updateFilledQuestion()
    //   })
    // );
    await giveEssayScore(
      currentQuestionData?.orig_order ?? currentNumber,
      Number(score),
    );
    await updateFilledQuestion();
  };

  const _handlerValidateScore = (text: any, maxScore: any) => {
    const inputText = text.trim();
    const firstValidation = isNaN(inputText);
    const secondValidation = text > maxScore;

    if (firstValidation) {
      Toast.show({
        type: 'error',
        text1: 'Masukkan angka',
      });
    } else if (secondValidation) {
      Toast.show({
        type: 'error',
        text1: `Jumlah maximal bobot ${maxScore}`,
      });
    } else {
      setIsScored(true);
      setScore(inputText);
    }
  };

  const checkScore = async () => {
    try {
      if (currentQuestionType?.name === 'ESSAY BASE') {
        await _handlerGiveEssayScore();
      }
      const res = await api.get(
        `${URL_PATH.get_check_exam_score(student_exam_id)}`,
      );
      if (res?.status === 200) {
        setStudentScore(res?.data?.data?.score);
      }
    } catch (err: any) {
      showErrorToast(err.message);
    }
  };

  const endScoring = async () => {
    try {
      showLoading();
      await apiPost({
        url: `${URL_PATH.end_scoring_exam_single_student(student_exam_id)}`,
      });

      setPopup(!popup);
      navigation.goBack();
    } catch (err: any) {
      showErrorToast(err.message);
    } finally {
      dismissLoading();
    }
  };

  return {
    navigation,
    isPG,
    isPGKompleks,
    unscored,
    currentNumber,
    setCurrentNumber,
    popup,
    setPopup,
    score,
    setScore,
    _handlerGiveEssayScore,
    _handlerValidateScore,
    student_name,
    exam_name,
    checkScore,
    studentScore,
    endScoring,
    isScored,
    setIsScored,
    mode,
    isShuffleQuestionActive,
    setUjianExplanationType,
    ujianExplanationType,
    bottomSheetRef,
    handleSheetChanges,
    snapPoints,
    currentSnapPoints,
    currentQuestionType,
    currentQuestionData,
    ujianData,
    mappedStepperQuestion,
  };
};
export {useScreen};
