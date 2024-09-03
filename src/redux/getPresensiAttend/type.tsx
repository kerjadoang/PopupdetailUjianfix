const BASE_NAME = 'PRESENSI_ATTEND';
export const PRESENSI_ATTEND_REQUEST = `${BASE_NAME}_REQUEST`;
export const PRESENSI_ATTEND_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PRESENSI_ATTEND_FAILED = `${BASE_NAME}_FAILED`;
export const PRESENSI_ATTEND_DESTROY = `${BASE_NAME}_DESTROY`;

interface PresensiAttendRequestAction {
  type: typeof PRESENSI_ATTEND_REQUEST;
}

interface PresensiAttendSuccessAction {
  type: typeof PRESENSI_ATTEND_SUCCESS;
  payload: {data: any};
}

interface PresensiAttendFailedAction {
  type: typeof PRESENSI_ATTEND_FAILED;
  payload: any;
}

interface PresensiAttendDestroyAction {
  type: typeof PRESENSI_ATTEND_DESTROY;
}

export type PRESENSI_ATTEND_ACTION_TYPES =
  | PresensiAttendRequestAction
  | PresensiAttendSuccessAction
  | PresensiAttendFailedAction
  | PresensiAttendDestroyAction;
