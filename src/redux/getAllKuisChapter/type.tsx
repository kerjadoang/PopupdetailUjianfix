const BASE_NAME = 'GET_ALL_KUIS_CHAPTER';
export const GET_ALL_KUIS_CHAPTER_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_KUIS_CHAPTER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_KUIS_CHAPTER_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_KUIS_CHAPTER_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllTestChapterRequestAction {
  type: typeof GET_ALL_KUIS_CHAPTER_REQUEST;
}

interface getAllTestChapterSuccessAction {
  type: typeof GET_ALL_KUIS_CHAPTER_SUCCESS;
  payload: {data: any};
}

interface getAllTestChapterFailedAction {
  type: typeof GET_ALL_KUIS_CHAPTER_FAILED;
  payload: any;
}

interface getAllTestChapterDestroyAction {
  type: typeof GET_ALL_KUIS_CHAPTER_DESTROY;
}

export type GET_ALL_KUIS_CHAPTER_ACTION_TYPES =
  | getAllTestChapterRequestAction
  | getAllTestChapterSuccessAction
  | getAllTestChapterFailedAction
  | getAllTestChapterDestroyAction;
