const BASE_NAME_PERLU_DIPERIKSA = 'GET_PERLU_DIPERIKSA';
const BASE_NAME_DIJADWALKAN = 'GET_DIJADWALKAN';

export const GET_PERLU_DIPERIKSA_REQUEST = `${BASE_NAME_PERLU_DIPERIKSA}_REQUEST`;
export const GET_PERLU_DIPERIKSA_SUCCESS = `${BASE_NAME_PERLU_DIPERIKSA}_SUCCESS`;
export const GET_PERLU_DIPERIKSA_FAILED = `${BASE_NAME_PERLU_DIPERIKSA}_FAILED`;
export const GET_PERLU_DIPERIKSA_DESTROY = `${BASE_NAME_PERLU_DIPERIKSA}_DESTROY`;

export const GET_DIJADWALKAN_REQUEST = `${BASE_NAME_DIJADWALKAN}_REQUEST`;
export const GET_DIJADWALKAN_SUCCESS = `${BASE_NAME_DIJADWALKAN}_SUCCESS`;
export const GET_DIJADWALKAN_FAILED = `${BASE_NAME_DIJADWALKAN}_FAILED`;
export const GET_DIJADWALKAN_DESTROY = `${BASE_NAME_DIJADWALKAN}_DESTROY`;

interface getPerluDiperiksaRequestAction {
  type: typeof GET_PERLU_DIPERIKSA_REQUEST;
}

interface getPerluDiperiksaSuccessAction {
  type: typeof GET_PERLU_DIPERIKSA_SUCCESS;
  payload: object;
}

interface getPerluDiperiksaFailedAction {
  type: typeof GET_PERLU_DIPERIKSA_FAILED;
  payload: any;
}

interface getPerluDiperiksaDestroyAction {
  type: typeof GET_PERLU_DIPERIKSA_DESTROY;
}

interface getDijadwalkanRequestAction {
  type: typeof GET_DIJADWALKAN_REQUEST;
}

interface getDijadwalkanSuccessAction {
  type: typeof GET_DIJADWALKAN_SUCCESS;
  payload: object;
}

interface getDijadwalkanFailedAction {
  type: typeof GET_DIJADWALKAN_FAILED;
  payload: any;
}

interface getDijadwalkanDestroyAction {
  type: typeof GET_DIJADWALKAN_DESTROY;
}

export type GET_GURU_PR_PROJEK_TUGAS_ACTION_TYPES =
  | getPerluDiperiksaRequestAction
  | getPerluDiperiksaSuccessAction
  | getPerluDiperiksaFailedAction
  | getPerluDiperiksaDestroyAction
  | getDijadwalkanRequestAction
  | getDijadwalkanSuccessAction
  | getDijadwalkanFailedAction
  | getDijadwalkanDestroyAction;
