const BASE_NAME = 'TODAY_ATTENDANCE';
export const TODAY_ATTENDANCE_REQUEST = `${BASE_NAME}_REQUEST`;
export const TODAY_ATTENDANCE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const TODAY_ATTENDANCE_FAILED = `${BASE_NAME}_FAILED`;
export const TODAY_ATTENDANCE_DESTROY = `${BASE_NAME}_DESTROY`;

interface TodayAttendanceRequestAction {
  type: typeof TODAY_ATTENDANCE_REQUEST;
}

interface TodayAttendanceSuccessAction {
  type: typeof TODAY_ATTENDANCE_SUCCESS;
  payload: {data: any};
}

interface TodayAttendanceFailedAction {
  type: typeof TODAY_ATTENDANCE_FAILED;
  payload: any;
}

interface TodayAttendanceDestroyAction {
  type: typeof TODAY_ATTENDANCE_DESTROY;
}

export type TODAY_ATTENDANCE_ACTION_TYPES =
  | TodayAttendanceRequestAction
  | TodayAttendanceSuccessAction
  | TodayAttendanceFailedAction
  | TodayAttendanceDestroyAction;
