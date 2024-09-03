const BASE_NAME = 'GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE';
export const GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_DESTROY = `${BASE_NAME}_DESTROY`;

interface getUlanganHarianChapterTestPackageRequestAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_REQUEST;
}

interface getUlanganHarianChapterTestPackageSuccessAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_SUCCESS;
  payload: {data: any};
}

interface getUlanganHarianChapterTestPackageFailedAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_FAILED;
  payload: any;
}

interface getUlanganHarianChapterTestPackageDestroyAction {
  type: typeof GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_DESTROY;
}

export type GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_ACTION_TYPES =
  | getUlanganHarianChapterTestPackageRequestAction
  | getUlanganHarianChapterTestPackageSuccessAction
  | getUlanganHarianChapterTestPackageFailedAction
  | getUlanganHarianChapterTestPackageDestroyAction;
