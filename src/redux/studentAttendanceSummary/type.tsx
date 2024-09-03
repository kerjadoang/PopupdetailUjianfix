const BASE_NAME = 'STUDENT_ATTENDANCE_SUM';
export const STUDENT_ATTENDANCE_SUM_REQUEST = `${BASE_NAME}_REQUEST`;
export const STUDENT_ATTENDANCE_SUM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const STUDENT_ATTENDANCE_SUM_FAILED = `${BASE_NAME}_FAILED`;
export const STUDENT_ATTENDANCE_SUM_DESTROY = `${BASE_NAME}_DESTROY`;

interface getStudentAttendanceRequestAction {
  type: typeof STUDENT_ATTENDANCE_SUM_REQUEST;
}

interface getStudentAttendanceSuccessAction {
  type: typeof STUDENT_ATTENDANCE_SUM_SUCCESS;
  payload: {data: any};
}

interface getStudentAttendanceFailedAction {
  type: typeof STUDENT_ATTENDANCE_SUM_FAILED;
  payload: any;
}

interface getStudentAttendanceDestroyAction {
  type: typeof STUDENT_ATTENDANCE_SUM_DESTROY;
}

export type STUDENT_ATTENDANCE_SUM_ACTION_TYPES =
  | getStudentAttendanceRequestAction
  | getStudentAttendanceSuccessAction
  | getStudentAttendanceFailedAction
  | getStudentAttendanceDestroyAction;
