const BASE_NAME = 'GET_UJIAN_AKHIR_TAHUN_PACKAGE';
export const GET_UJIAN_AKHIR_TAHUN_PACKAGE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_UJIAN_AKHIR_TAHUN_PACKAGE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_UJIAN_AKHIR_TAHUN_PACKAGE_FAILED = `${BASE_NAME}_FAILED`;
export const GET_UJIAN_AKHIR_TAHUN_PACKAGE_DESTROY = `${BASE_NAME}_DESTROY`;

interface getUjianAkhirTahunPackageRequestAction {
  type: typeof GET_UJIAN_AKHIR_TAHUN_PACKAGE_REQUEST;
}

interface getUjianAkhirTahunPackageSuccessAction {
  type: typeof GET_UJIAN_AKHIR_TAHUN_PACKAGE_SUCCESS;
  payload: {data: any};
}

interface getUjianAkhirTahunPackageFailedAction {
  type: typeof GET_UJIAN_AKHIR_TAHUN_PACKAGE_FAILED;
  payload: any;
}

interface getUjianAkhirTahunPackageDestroyAction {
  type: typeof GET_UJIAN_AKHIR_TAHUN_PACKAGE_DESTROY;
}

export type GET_UJIAN_AKHIR_TAHUN_PACKAGE_ACTION_TYPES =
  | getUjianAkhirTahunPackageRequestAction
  | getUjianAkhirTahunPackageSuccessAction
  | getUjianAkhirTahunPackageFailedAction
  | getUjianAkhirTahunPackageDestroyAction;
