const BASE_NAME = 'PRESENSI';
export const PRESENSI_REQUEST = `${BASE_NAME}_REQUEST`;
export const PRESENSI_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PRESENSI_FAILED = `${BASE_NAME}_FAILED`;
export const PRESENSI_DESTROY = `${BASE_NAME}_DESTROY`;

interface PresensiRequestAction {
  type: typeof PRESENSI_REQUEST;
}

interface PresensiSuccessAction {
  type: typeof PRESENSI_SUCCESS;
  payload: {data: any};
}

interface PresensiFailedAction {
  type: typeof PRESENSI_FAILED;
  payload: any;
}

interface PresensiDestroyAction {
  type: typeof PRESENSI_DESTROY;
}

export type PRESENSI_ACTION_TYPES =
  | PresensiRequestAction
  | PresensiSuccessAction
  | PresensiFailedAction
  | PresensiDestroyAction;
