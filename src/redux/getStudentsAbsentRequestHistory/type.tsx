const BASE_NAME = 'GET_STUDENTS_ABSENT_REQUEST_HISTORY';
export const GET_STUDENTS_ABSENT_REQUEST_HISTORY_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_STUDENTS_ABSENT_REQUEST_HISTORY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_STUDENTS_ABSENT_REQUEST_HISTORY_FAILED = `${BASE_NAME}_FAILED`;
export const GET_STUDENTS_ABSENT_REQUEST_HISTORY_DESTROY = `${BASE_NAME}_DESTROY`;

interface getStudentsAbsentRequestHistoryRequestAction {
  type: typeof GET_STUDENTS_ABSENT_REQUEST_HISTORY_REQUEST;
}

interface getStudentsAbsentRequestHistorySuccessAction {
  type: typeof GET_STUDENTS_ABSENT_REQUEST_HISTORY_SUCCESS;
  payload: {data: any};
}

interface getStudentsAbsentRequestHistoryFailedAction {
  type: typeof GET_STUDENTS_ABSENT_REQUEST_HISTORY_FAILED;
  payload: any;
}

interface getStudentsAbsentRequestHistoryDestroyAction {
  type: typeof GET_STUDENTS_ABSENT_REQUEST_HISTORY_DESTROY;
}

export type GET_STUDENTS_ABSENT_REQUEST_HISTORY_ACTION_TYPES =
  | getStudentsAbsentRequestHistoryRequestAction
  | getStudentsAbsentRequestHistorySuccessAction
  | getStudentsAbsentRequestHistoryFailedAction
  | getStudentsAbsentRequestHistoryDestroyAction;
