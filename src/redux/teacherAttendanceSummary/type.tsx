const BASE_NAME = 'TEACHER_ATTENDANCE_SUM';
export const TEACHER_ATTENDANCE_SUM_REQUEST = `${BASE_NAME}_REQUEST`;
export const TEACHER_ATTENDANCE_SUM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const TEACHER_ATTENDANCE_SUM_FAILED = `${BASE_NAME}_FAILED`;
export const TEACHER_ATTENDANCE_SUM_DESTROY = `${BASE_NAME}_DESTROY`;

interface getTeacherAttendanceRequestAction {
  type: typeof TEACHER_ATTENDANCE_SUM_REQUEST;
}

interface getTeacherAttendanceSuccessAction {
  type: typeof TEACHER_ATTENDANCE_SUM_SUCCESS;
  payload: {data: any};
}

interface getTeacherAttendanceFailedAction {
  type: typeof TEACHER_ATTENDANCE_SUM_FAILED;
  payload: any;
}

interface getTeacherAttendanceDestroyAction {
  type: typeof TEACHER_ATTENDANCE_SUM_DESTROY;
}

export type _IPayloadTeacherAttendance = {
  date: string;
};

export type TEACHER_ATTENDANCE_SUM_ACTION_TYPES =
  | getTeacherAttendanceRequestAction
  | getTeacherAttendanceSuccessAction
  | getTeacherAttendanceFailedAction
  | getTeacherAttendanceDestroyAction;
