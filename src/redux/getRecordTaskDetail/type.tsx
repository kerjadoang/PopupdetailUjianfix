const BASE_NAME = 'GET_RECORD_TASK_DETAIL';
export const GET_RECORD_TASK_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_RECORD_TASK_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_RECORD_TASK_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const GET_RECORD_TASK_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface getRecordTaskDetailRequestAction {
  type: typeof GET_RECORD_TASK_DETAIL_REQUEST;
}

interface getRecordTaskDetailSuccessAction {
  type: typeof GET_RECORD_TASK_DETAIL_SUCCESS;
  payload: {data: any};
}

interface getRecordTaskDetailFailedAction {
  type: typeof GET_RECORD_TASK_DETAIL_FAILED;
  payload: any;
}

interface getRecordTaskDetailDestroyAction {
  type: typeof GET_RECORD_TASK_DETAIL_DESTROY;
}

export type GET_RECORD_TASK_DETAIL_ACTION_TYPES =
  | getRecordTaskDetailRequestAction
  | getRecordTaskDetailSuccessAction
  | getRecordTaskDetailFailedAction
  | getRecordTaskDetailDestroyAction;
