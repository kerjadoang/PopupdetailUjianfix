const BASE_NAME = 'GET_EXAM_HISTORY';
export const GET_EXAM_HISTORY_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_EXAM_HISTORY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_EXAM_HISTORY_FAILED = `${BASE_NAME}_FAILED`;
export const GET_EXAM_HISTORY_DESTROY = `${BASE_NAME}_DESTROY`;

interface getExamHistoryRequestAction {
  type: typeof GET_EXAM_HISTORY_REQUEST;
}

interface getExamHistorySuccessAction {
  type: typeof GET_EXAM_HISTORY_SUCCESS;
  payload: {data: any};
}

interface getExamHistoryFailedAction {
  type: typeof GET_EXAM_HISTORY_FAILED;
  payload: any;
}

interface getExamHistoryDestroyAction {
  type: typeof GET_EXAM_HISTORY_DESTROY;
}

export type GET_EXAM_HISTORY_ACTION_TYPES =
  | getExamHistoryRequestAction
  | getExamHistorySuccessAction
  | getExamHistoryFailedAction
  | getExamHistoryDestroyAction;
