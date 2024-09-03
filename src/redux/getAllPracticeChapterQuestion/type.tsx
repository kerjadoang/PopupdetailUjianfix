const BASE_NAME = 'GET_ALL_PRACTICE_CHAPTER_QUESTION';
export const GET_ALL_PRACTICE_CHAPTER_QUESTION_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_PRACTICE_CHAPTER_QUESTION_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_PRACTICE_CHAPTER_QUESTION_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_PRACTICE_CHAPTER_QUESTION_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllPracticeChapterQuestionRequestAction {
  type: typeof GET_ALL_PRACTICE_CHAPTER_QUESTION_REQUEST;
}

interface getAllPracticeChapterQuestionSuccessAction {
  type: typeof GET_ALL_PRACTICE_CHAPTER_QUESTION_SUCCESS;
  payload: {data: any};
}

interface getAllPracticeChapterQuestionFailedAction {
  type: typeof GET_ALL_PRACTICE_CHAPTER_QUESTION_FAILED;
  payload: any;
}

interface getAllPracticeChapterQuestionDestroyAction {
  type: typeof GET_ALL_PRACTICE_CHAPTER_QUESTION_DESTROY;
}

export type GET_ALL_PRACTICE_CHAPTER_QUESTION_ACTION_TYPES =
  | getAllPracticeChapterQuestionRequestAction
  | getAllPracticeChapterQuestionSuccessAction
  | getAllPracticeChapterQuestionFailedAction
  | getAllPracticeChapterQuestionDestroyAction;
