const BASE_NAME = 'GET_OFFLINE_CLASS_ATTENDANCE_DETAIL';
export const GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface GetOfflineClassAttendanceDetailRequestAction {
  type: typeof GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_REQUEST;
}

interface GetOfflineClassAttendanceDetailSuccessAction {
  type: typeof GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_SUCCESS;
  payload: {data: any};
}

interface GetOfflineClassAttendanceDetailFailedAction {
  type: typeof GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_FAILED;
  payload: any;
}

interface GetOfflineClassAttendanceDetailDestroyAction {
  type: typeof GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_DESTROY;
}

export type GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_ACTION_TYPES =
  | GetOfflineClassAttendanceDetailRequestAction
  | GetOfflineClassAttendanceDetailSuccessAction
  | GetOfflineClassAttendanceDetailFailedAction
  | GetOfflineClassAttendanceDetailDestroyAction;
