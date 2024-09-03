const BASE_NAME = 'GET_STUDENTS_ATTENDANCE_CALENDAR';
export const GET_STUDENTS_ATTENDANCE_CALENDAR_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_STUDENTS_ATTENDANCE_CALENDAR_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_STUDENTS_ATTENDANCE_CALENDAR_FAILED = `${BASE_NAME}_FAILED`;
export const GET_STUDENTS_ATTENDANCE_CALENDAR_DESTROY = `${BASE_NAME}_DESTROY`;

interface getStudentAttendanceCalendarRequestAction {
  type: typeof GET_STUDENTS_ATTENDANCE_CALENDAR_REQUEST;
}

interface getStudentAttendanceCalendarSuccessAction {
  type: typeof GET_STUDENTS_ATTENDANCE_CALENDAR_SUCCESS;
  payload: {data: any};
}

interface getStudentAttendanceCalendarFailedAction {
  type: typeof GET_STUDENTS_ATTENDANCE_CALENDAR_FAILED;
  payload: any;
}

interface getStudentAttendanceCalendarDestroyAction {
  type: typeof GET_STUDENTS_ATTENDANCE_CALENDAR_DESTROY;
}

export type GET_STUDENTS_ATTENDANCE_CALENDAR_ACTION_TYPES =
  | getStudentAttendanceCalendarRequestAction
  | getStudentAttendanceCalendarSuccessAction
  | getStudentAttendanceCalendarFailedAction
  | getStudentAttendanceCalendarDestroyAction;
