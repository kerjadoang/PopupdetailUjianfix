const BASE_NAME = 'GET_UJIAN_TENGAH_SEMESTER_PACKAGE';
export const GET_UJIAN_TENGAH_SEMESTER_PACKAGE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_UJIAN_TENGAH_SEMESTER_PACKAGE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_UJIAN_TENGAH_SEMESTER_PACKAGE_FAILED = `${BASE_NAME}_FAILED`;
export const GET_UJIAN_TENGAH_SEMESTER_PACKAGE_DESTROY = `${BASE_NAME}_DESTROY`;

interface getUjianTengahSemesterPackageRequestAction {
  type: typeof GET_UJIAN_TENGAH_SEMESTER_PACKAGE_REQUEST;
}

interface getUjianTengahSemesterPackageSuccessAction {
  type: typeof GET_UJIAN_TENGAH_SEMESTER_PACKAGE_SUCCESS;
  payload: {data: any};
}

interface getUjianTengahSemesterPackageFailedAction {
  type: typeof GET_UJIAN_TENGAH_SEMESTER_PACKAGE_FAILED;
  payload: any;
}

interface getUjianTengahSemesterPackageDestroyAction {
  type: typeof GET_UJIAN_TENGAH_SEMESTER_PACKAGE_DESTROY;
}

export type GET_UJIAN_TENGAH_SEMESTER_PACKAGE_ACTION_TYPES =
  | getUjianTengahSemesterPackageRequestAction
  | getUjianTengahSemesterPackageSuccessAction
  | getUjianTengahSemesterPackageFailedAction
  | getUjianTengahSemesterPackageDestroyAction;
