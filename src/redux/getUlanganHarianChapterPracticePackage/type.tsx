const BASE_NAME = 'GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE';
export const GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_DESTROY = `${BASE_NAME}_DESTROY`;

interface getUlanganHarianChapterPracticePackageRequestAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_REQUEST;
}

interface getUlanganHarianChapterPracticePackageSuccessAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_SUCCESS;
  payload: {data: any};
}

interface getUlanganHarianChapterPracticePackageFailedAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_FAILED;
  payload: any;
}

interface getUlanganHarianChapterPracticePackageDestroyAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_DESTROY;
}

export type GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_ACTION_TYPES =
  | getUlanganHarianChapterPracticePackageRequestAction
  | getUlanganHarianChapterPracticePackageSuccessAction
  | getUlanganHarianChapterPracticePackageFailedAction
  | getUlanganHarianChapterPracticePackageDestroyAction;
