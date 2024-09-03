const BASE_NAME = 'GET_ULANGAN_HARIAN_CHAPTER';
export const GET_ULANGAN_HARIAN_CHAPTER_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ULANGAN_HARIAN_CHAPTER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ULANGAN_HARIAN_CHAPTER_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ULANGAN_HARIAN_CHAPTER_DESTROY = `${BASE_NAME}_DESTROY`;

interface getUlanganHarianChapterRequestAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_REQUEST;
}

interface getUlanganHarianChapterSuccessAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_SUCCESS;
  payload: {data: any};
}

interface getUlanganHarianChapterFailedAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_FAILED;
  payload: any;
}

interface getUlanganHarianChapterDestroyAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_DESTROY;
}

export type GET_ULANGAN_HARIAN_CHAPTER_ACTION_TYPES =
  | getUlanganHarianChapterRequestAction
  | getUlanganHarianChapterSuccessAction
  | getUlanganHarianChapterFailedAction
  | getUlanganHarianChapterDestroyAction;
