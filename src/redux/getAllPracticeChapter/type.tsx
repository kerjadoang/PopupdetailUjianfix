const BASE_NAME = 'GET_ALL_PRACTICE_CHAPTER';
export const GET_ALL_PRACTICE_CHAPTER_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_PRACTICE_CHAPTER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_PRACTICE_CHAPTER_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_PRACTICE_CHAPTER_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllPracticeChapterRequestAction {
  type: typeof GET_ALL_PRACTICE_CHAPTER_REQUEST;
}

interface getAllPracticeChapterSuccessAction {
  type: typeof GET_ALL_PRACTICE_CHAPTER_SUCCESS;
  payload: {data: any};
}

interface getAllPracticeChapterFailedAction {
  type: typeof GET_ALL_PRACTICE_CHAPTER_FAILED;
  payload: any;
}

interface getAllPracticeChapterDestroyAction {
  type: typeof GET_ALL_PRACTICE_CHAPTER_DESTROY;
}

export type GET_ALL_PRACTICE_CHAPTER_ACTION_TYPES =
  | getAllPracticeChapterRequestAction
  | getAllPracticeChapterSuccessAction
  | getAllPracticeChapterFailedAction
  | getAllPracticeChapterDestroyAction;
