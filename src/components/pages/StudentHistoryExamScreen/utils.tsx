import {isStringContains} from '@constants/functional';

const parseType = (type: string) => {
  if (isStringContains(type, '', ['multiple', 'pilihan ganda'])) {
    return 'pilihan ganda';
  }

  if (isStringContains(type, '', ['mix', 'campuran'])) {
    return 'campuran';
  }

  return 'uraian';
};

// Dunmmy ImageId : 653f57dbe29e21116102aa52
const resultDataMapping: CallBackWithParams<ExplanationQuestionData[], any> = (
  values: any,
) => {
  return values?.map((value: any) => {
    const userAnswerPGK = value?.question?.options?.filter((val: any) =>
      value?.user_answer_complex?.includes(val?.id),
    );
    const correctAnswerPGK = value?.question?.options?.filter(
      (val: any) => val?.is_correct === true,
    );
    return {
      id: value?.number,
      orders: value?.orders || value?.order || value?.number,
      question_type_id: value?.question?.question_type_id,
      question: value?.question?.question,
      answer_user:
        value?.user_answer?.key ||
        value?.user_input ||
        userAnswerPGK?.map((ans: any) => ans?.key).join(', '),
      answer_system:
        value?.question?.question_type_id === 1
          ? value?.question?.options?.find((_value: any) => _value?.is_correct)
              ?.key
          : correctAnswerPGK?.map((ans: any) => ans?.key).join(', '),
      explanation: value?.question?.question_discuss?.explanation,
      question_image_id: value?.question?.file_id || '',
      answer_user_image_id: value?.user_answer?.file_id || '',
      explanation_image_id: value?.question?.question_discuss?.file_id || '',
    } as ExplanationQuestionData;
  });
};

export const goToExplanationUtils = ({
  data,
  title,
  navigation,
  questionServiceId,
  type,
}: IGotoExplanation) => {
  const {correct_answer, answered, pass, wrong_answer, package_type} = data;

  const correctsData = resultDataMapping(correct_answer);
  const answersData = resultDataMapping(answered);
  const wrongsData = resultDataMapping(wrong_answer);
  const skipsData = resultDataMapping(pass);

  const screenParams = {
    title: title,
    questionServiceId: questionServiceId,
    data: {
      type: parseType(type || package_type || ''),
      corrects: {
        data: correctsData,
        total: correctsData?.length || 0,
      },
      wrongs: {data: wrongsData, total: wrongsData?.length || 0},
      answers: {
        data: answersData,
        total: answersData?.length || 0,
      },
      skips: {data: skipsData, total: skipsData?.length || 0},
    },
  };
  return navigation.navigate('ExplanationScreen', screenParams);
};
