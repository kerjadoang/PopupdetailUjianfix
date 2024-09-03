const BASE_NAME = 'GET_ALL_EXAM_HISTORY_HISTORY_PARENT';
export const GET_ALL_EXAM_HISTORY_PARENT_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_EXAM_HISTORY_PARENT_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_EXAM_HISTORY_PARENT_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_EXAM_HISTORY_PARENT_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllExamHistoryParentRequestAction {
  type: typeof GET_ALL_EXAM_HISTORY_PARENT_REQUEST;
}

interface getAllExamHistoryParentSuccessAction {
  type: typeof GET_ALL_EXAM_HISTORY_PARENT_SUCCESS;
  payload: {data: any};
}

interface getAllExamHistoryParentFailedAction {
  type: typeof GET_ALL_EXAM_HISTORY_PARENT_FAILED;
  payload: any;
}

interface getAllExamHistoryParentDestroyAction {
  type: typeof GET_ALL_EXAM_HISTORY_PARENT_DESTROY;
}

export type GET_ALL_EXAM_HISTORY_PARENT_ACTION_TYPES =
  | getAllExamHistoryParentRequestAction
  | getAllExamHistoryParentSuccessAction
  | getAllExamHistoryParentFailedAction
  | getAllExamHistoryParentDestroyAction;
