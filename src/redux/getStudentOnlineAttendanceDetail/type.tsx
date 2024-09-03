const BASE_NAME = 'GET_STUDENT_ONLINE_ATTENDANCE_DETAIL';
export const GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface getStudentOnlineAttendanceDetailRequestAction {
  type: typeof GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_REQUEST;
}

interface getStudentOnlineAttendanceDetailSuccessAction {
  type: typeof GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_SUCCESS;
  payload: {data: any};
}

interface getStudentOnlineAttendanceDetailFailedAction {
  type: typeof GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_FAILED;
  payload: any;
}

interface getStudentOnlineAttendanceDetailDestroyAction {
  type: typeof GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_DESTROY;
}

export type GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_ACTION_TYPES =
  | getStudentOnlineAttendanceDetailRequestAction
  | getStudentOnlineAttendanceDetailSuccessAction
  | getStudentOnlineAttendanceDetailFailedAction
  | getStudentOnlineAttendanceDetailDestroyAction;
