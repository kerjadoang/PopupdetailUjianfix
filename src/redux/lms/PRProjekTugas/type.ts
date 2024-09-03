const BASE_NAME_BELUM_DIKERJAKAN = 'GET_BELUM_DIKERJAKAN';
const BASE_NAME_RIWAYAT = 'GET_RIWAYAT';

export const GET_SEARCH = 'GET_SEARCH';

export const GET_BELUM_DIKERJAKAN_REQUEST = `${BASE_NAME_BELUM_DIKERJAKAN}_REQUEST`;
export const GET_BELUM_DIKERJAKAN_SUCCESS = `${BASE_NAME_BELUM_DIKERJAKAN}_SUCCESS`;
export const GET_BELUM_DIKERJAKAN_FAILED = `${BASE_NAME_BELUM_DIKERJAKAN}_FAILED`;
export const GET_BELUM_DIKERJAKAN_DESTROY = `${BASE_NAME_BELUM_DIKERJAKAN}_DESTROY`;

export const GET_RIWAYAT_REQUEST = `${BASE_NAME_RIWAYAT}_REQUEST`;
export const GET_RIWAYAT_SUCCESS = `${BASE_NAME_RIWAYAT}_SUCCESS`;
export const GET_RIWAYAT_FAILED = `${BASE_NAME_RIWAYAT}_FAILED`;
export const GET_RIWAYAT_DESTROY = `${BASE_NAME_RIWAYAT}_DESTROY`;

interface getSearchAction {
  type: typeof GET_SEARCH;
  payload: string;
}

interface getBelumDikerjakanRequestAction {
  type: typeof GET_BELUM_DIKERJAKAN_REQUEST;
}

interface getBelumDikerjakanSuccessAction {
  type: typeof GET_BELUM_DIKERJAKAN_SUCCESS;
  payload: object;
}

interface getBelumDikerjakanFailedAction {
  type: typeof GET_BELUM_DIKERJAKAN_FAILED;
  payload: any;
}

interface getBelumDikerjakanDestroyAction {
  type: typeof GET_BELUM_DIKERJAKAN_DESTROY;
}

interface getRiwayatRequestAction {
  type: typeof GET_RIWAYAT_REQUEST;
}

interface getRiwayatSuccessAction {
  type: typeof GET_RIWAYAT_SUCCESS;
  payload: object;
}

interface getRiwayatFailedAction {
  type: typeof GET_RIWAYAT_FAILED;
  payload: any;
}

interface getRiwayatDestroyAction {
  type: typeof GET_RIWAYAT_DESTROY;
}

export type GET_PR_PROJEK_TUGAS_BELUM_DIKERJAKAN_ACTION_TYPES =
  | getSearchAction
  | getBelumDikerjakanRequestAction
  | getBelumDikerjakanSuccessAction
  | getBelumDikerjakanFailedAction
  | getBelumDikerjakanDestroyAction
  | getRiwayatRequestAction
  | getRiwayatSuccessAction
  | getRiwayatFailedAction
  | getRiwayatDestroyAction;
