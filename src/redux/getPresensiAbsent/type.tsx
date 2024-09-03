const BASE_NAME = 'PRESENSI_ABSENT';
export const PRESENSI_ABSENT_REQUEST = `${BASE_NAME}_REQUEST`;
export const PRESENSI_ABSENT_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PRESENSI_ABSENT_FAILED = `${BASE_NAME}_FAILED`;
export const PRESENSI_ABSENT_DESTROY = `${BASE_NAME}_DESTROY`;

interface PresensiAbsentRequestAction {
  type: typeof PRESENSI_ABSENT_REQUEST;
}

interface PresensiAbsentSuccessAction {
  type: typeof PRESENSI_ABSENT_SUCCESS;
  payload: {data: any};
}

interface PresensiAbsentFailedAction {
  type: typeof PRESENSI_ABSENT_FAILED;
  payload: any;
}

interface PresensiAbsentDestroyAction {
  type: typeof PRESENSI_ABSENT_DESTROY;
}

export type PRESENSI_ABSENT_ACTION_TYPES =
  | PresensiAbsentRequestAction
  | PresensiAbsentSuccessAction
  | PresensiAbsentFailedAction
  | PresensiAbsentDestroyAction;
