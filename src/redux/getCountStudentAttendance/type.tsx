const BASE_NAME = 'STUDENT_YEARLY_ATTENDANCE';
export const STUDENT_YEARLY_ATTENDANCE_REQUEST = `${BASE_NAME}_REQUEST`;
export const STUDENT_YEARLY_ATTENDANCE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const STUDENT_YEARLY_ATTENDANCE_FAILED = `${BASE_NAME}_FAILED`;
export const STUDENT_YEARLY_ATTENDANCE_DESTROY = `${BASE_NAME}_DESTROY`;

interface StudentYearlyAttendanceRequestAction {
  type: typeof STUDENT_YEARLY_ATTENDANCE_REQUEST;
}

interface StudentYearlyAttendanceSuccessAction {
  type: typeof STUDENT_YEARLY_ATTENDANCE_SUCCESS;
  payload: {data: any};
}

interface StudentYearlyAttendanceFailedAction {
  type: typeof STUDENT_YEARLY_ATTENDANCE_FAILED;
  payload: any;
}

interface StudentYearlyAttendanceDestroyAction {
  type: typeof STUDENT_YEARLY_ATTENDANCE_DESTROY;
}

export type STUDENT_YEARLY_ATTENDANCE_ACTION_TYPES =
  | StudentYearlyAttendanceRequestAction
  | StudentYearlyAttendanceSuccessAction
  | StudentYearlyAttendanceFailedAction
  | StudentYearlyAttendanceDestroyAction;
