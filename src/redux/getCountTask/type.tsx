const BASE_NAME = 'GET_COUNT_TASK';
export const GET_COUNT_TASK_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_COUNT_TASK_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_COUNT_TASK_FAILED = `${BASE_NAME}_FAILED`;
export const GET_COUNT_TASK_DESTROY = `${BASE_NAME}_DESTROY`;

interface GetCountTaskRequestAction {
  type: typeof GET_COUNT_TASK_REQUEST;
}

interface GetCountTaskSuccessAction {
  type: typeof GET_COUNT_TASK_SUCCESS;
  payload: {data: any};
}

interface GetCountTaskFailedAction {
  type: typeof GET_COUNT_TASK_FAILED;
  payload: any;
}

interface GetCountTaskDestroyAction {
  type: typeof GET_COUNT_TASK_DESTROY;
}

export type GET_COUNT_TASK_ACTION_TYPES =
  | GetCountTaskRequestAction
  | GetCountTaskSuccessAction
  | GetCountTaskFailedAction
  | GetCountTaskDestroyAction;
