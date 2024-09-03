const BASE_NAME = 'GET_ALL_CHAPTER';
export const GET_ALL_CHAPTER_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_CHAPTER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_CHAPTER_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_CHAPTER_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllChapterRequestAction {
  type: typeof GET_ALL_CHAPTER_REQUEST;
}

interface getAllChapterSuccessAction {
  type: typeof GET_ALL_CHAPTER_SUCCESS;
  payload: {data: any};
}

interface getAllChapterFailedAction {
  type: typeof GET_ALL_CHAPTER_FAILED;
  payload: any;
}

interface getAllChapterDestroyAction {
  type: typeof GET_ALL_CHAPTER_DESTROY;
}

export type GET_ALL_CHAPTER_ACTION_TYPES =
  | getAllChapterRequestAction
  | getAllChapterSuccessAction
  | getAllChapterFailedAction
  | getAllChapterDestroyAction;
