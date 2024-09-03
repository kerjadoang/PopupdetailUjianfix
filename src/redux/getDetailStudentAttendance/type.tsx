const BASE_NAME = 'DETAIL_ATTENDANCE';
export const DETAIL_ATTENDANCE_REQUEST = `${BASE_NAME}_REQUEST`;
export const DETAIL_ATTENDANCE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const DETAIL_ATTENDANCE_FAILED = `${BASE_NAME}_FAILED`;
export const DETAIL_ATTENDANCE_DESTROY = `${BASE_NAME}_DESTROY`;

interface getDetailAttendanceRequestAction {
  type: typeof DETAIL_ATTENDANCE_REQUEST;
}

interface getDetailAttendanceSuccessAction {
  type: typeof DETAIL_ATTENDANCE_SUCCESS;
  payload: {data: any};
}

interface getDetailAttendanceFailedAction {
  type: typeof DETAIL_ATTENDANCE_FAILED;
  payload: any;
}

interface getDetailAttendanceDestroyAction {
  type: typeof DETAIL_ATTENDANCE_DESTROY;
}

export type _IPayloadAttendanceDetail = {
  user_id: any;
  date: any;
};

export type DETAIL_ATTENDANCE_ACTION_TYPES =
  | getDetailAttendanceRequestAction
  | getDetailAttendanceSuccessAction
  | getDetailAttendanceFailedAction
  | getDetailAttendanceDestroyAction;
