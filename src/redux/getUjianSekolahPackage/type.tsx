const BASE_NAME = 'GET_UJIAN_SEKOLAH_PACKAGE';
export const GET_UJIAN_SEKOLAH_PACKAGE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_UJIAN_SEKOLAH_PACKAGE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_UJIAN_SEKOLAH_PACKAGE_FAILED = `${BASE_NAME}_FAILED`;
export const GET_UJIAN_SEKOLAH_PACKAGE_DESTROY = `${BASE_NAME}_DESTROY`;

interface getUjianSekolahPackageRequestAction {
  type: typeof GET_UJIAN_SEKOLAH_PACKAGE_REQUEST;
}

interface getUjianSekolahPackageSuccessAction {
  type: typeof GET_UJIAN_SEKOLAH_PACKAGE_SUCCESS;
  payload: {data: any};
}

interface getUjianSekolahPackageFailedAction {
  type: typeof GET_UJIAN_SEKOLAH_PACKAGE_FAILED;
  payload: any;
}

interface getUjianSekolahPackageDestroyAction {
  type: typeof GET_UJIAN_SEKOLAH_PACKAGE_DESTROY;
}

export type GET_UJIAN_SEKOLAH_PACKAGE_ACTION_TYPES =
  | getUjianSekolahPackageRequestAction
  | getUjianSekolahPackageSuccessAction
  | getUjianSekolahPackageFailedAction
  | getUjianSekolahPackageDestroyAction;
