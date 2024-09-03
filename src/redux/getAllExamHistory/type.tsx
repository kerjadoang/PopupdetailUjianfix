const BASE_NAME = 'GET_ALL_EXAM_HISTORY_HISTORY';
export const GET_ALL_EXAM_HISTORY_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_EXAM_HISTORY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_EXAM_HISTORY_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_EXAM_HISTORY_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllExamHistoryRequestAction {
  type: typeof GET_ALL_EXAM_HISTORY_REQUEST;
}

interface getAllExamHistorySuccessAction {
  type: typeof GET_ALL_EXAM_HISTORY_SUCCESS;
  payload: {data: any};
}

interface getAllExamHistoryFailedAction {
  type: typeof GET_ALL_EXAM_HISTORY_FAILED;
  payload: any;
}

interface getAllExamHistoryDestroyAction {
  type: typeof GET_ALL_EXAM_HISTORY_DESTROY;
}

export type GET_ALL_EXAM_HISTORY_ACTION_TYPES =
  | getAllExamHistoryRequestAction
  | getAllExamHistorySuccessAction
  | getAllExamHistoryFailedAction
  | getAllExamHistoryDestroyAction;
