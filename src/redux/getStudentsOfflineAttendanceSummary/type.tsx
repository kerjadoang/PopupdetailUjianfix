const BASE_NAME = 'GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY';
export const GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_FAILED = `${BASE_NAME}_FAILED`;
export const GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_DESTROY = `${BASE_NAME}_DESTROY`;

interface GetStudentsOfflineAttendanceSummaryRequestAction {
  type: typeof GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_REQUEST;
}

interface GetStudentsOfflineAttendanceSummarySuccessAction {
  type: typeof GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_SUCCESS;
  payload: {data: any};
}

interface GetStudentsOfflineAttendanceSummaryFailedAction {
  type: typeof GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_FAILED;
  payload: any;
}

interface GetStudentsOfflineAttendanceSummaryDestroyAction {
  type: typeof GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_DESTROY;
}

export type GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_ACTION_TYPES =
  | GetStudentsOfflineAttendanceSummaryRequestAction
  | GetStudentsOfflineAttendanceSummarySuccessAction
  | GetStudentsOfflineAttendanceSummaryFailedAction
  | GetStudentsOfflineAttendanceSummaryDestroyAction;
