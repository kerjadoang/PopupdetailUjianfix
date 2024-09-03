import {useNavigate} from '@hooks/useNavigate';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {mockSoalData} from './utils';
import {deepClone, isStringContains} from '@constants/functional';
import BottomSheet from '@gorhom/bottom-sheet';

const initMappedStepperQuestion = {
  correct: [],
  incorrect: [],
  filled: [],
  skipped: [],
};

const useUjianExplanation = () => {
  const {navigation, popScreen} = useNavigate();
  const ujianData = mockSoalData.paper;
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
  const [mappedStepperQuestion, setMappedStepperQuestion] =
    useState<IResultQuestion>(initMappedStepperQuestion);
  const [ujianExplanationType, setUjianExplanationType] = useState<
    IUjianExplanationType[]
  >([]);
  const [currentSnapPoints] = useState<string>('20%');
  const isShuffleOptionActive = useMemo(
    () => ujianExplanationType.some(item => item === 'shuffle_option'),
    [ujianExplanationType],
  );

  const isShuffleQuestionActive = useMemo(
    () => ujianExplanationType.some(item => item === 'shuffle_question'),
    [ujianExplanationType],
  );
  const explanationData = isShuffleQuestionActive
    ? ujianData.questions
    : ujianData.original_questions;

  const currentQuestionData = explanationData?.[currentQuestionNumber - 1];

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['15%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback(() => {
    // setCurrentSnapPoints(snapPoints[index]);
  }, []);

  const questionType: IRenderQuestionBodyType = isStringContains(
    currentQuestionData?.question_type?.name || 'MCQ',
    'essay',
  )
    ? 'ESSAY'
    : 'MCQ';

  const updateStepperQuestion = () => {
    const newMappedStepperQuestion: IResultQuestion = deepClone(
      initMappedStepperQuestion,
    );

    explanationData?.forEach((item: PaperQuestion, idx: number) => {
      if (item?.status === 'answered') {
        newMappedStepperQuestion.filled?.push((item?.order || idx) - 1);
      }
    });

    setMappedStepperQuestion(newMappedStepperQuestion);
  };

  useEffect(() => {
    updateStepperQuestion();
  }, [explanationData]);

  return {
    isShuffleQuestionActive,
    isShuffleOptionActive,
    navigation,
    popScreen,
    mappedStepperQuestion,
    ujianExplanationType,
    setUjianExplanationType,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    ujianData,
    questionType,
    currentSnapPoints,
    bottomSheetRef,
    handleSheetChanges,
    snapPoints,
    explanationData,
    currentQuestionData,
  };
};
export default useUjianExplanation;
