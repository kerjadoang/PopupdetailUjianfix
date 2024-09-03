const BASE_NAME = 'GET_ALL_TASK_HISTORY';
export const GET_ALL_TASK_HISTORY_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_TASK_HISTORY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_TASK_HISTORY_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_TASK_HISTORY_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllTaskHistoryRequestAction {
  type: typeof GET_ALL_TASK_HISTORY_REQUEST;
}

interface getAllTaskHistorySuccessAction {
  type: typeof GET_ALL_TASK_HISTORY_SUCCESS;
  payload: {data: any};
}

interface getAllTaskHistoryFailedAction {
  type: typeof GET_ALL_TASK_HISTORY_FAILED;
  payload: any;
}

interface getAllTaskHistoryDestroyAction {
  type: typeof GET_ALL_TASK_HISTORY_DESTROY;
}

export type GET_ALL_TASK_HISTORY_ACTION_TYPES =
  | getAllTaskHistoryRequestAction
  | getAllTaskHistorySuccessAction
  | getAllTaskHistoryFailedAction
  | getAllTaskHistoryDestroyAction;
