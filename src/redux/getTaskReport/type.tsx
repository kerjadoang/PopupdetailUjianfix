const BASE_NAME = 'TASK';
export const TASK_REQUEST = `${BASE_NAME}_REQUEST`;
export const TASK_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const TASK_FAILED = `${BASE_NAME}_FAILED`;
export const TASK_DESTROY = `${BASE_NAME}_DESTROY`;

interface TaskRequestAction {
  type: typeof TASK_REQUEST;
}

interface TaskSuccessAction {
  type: typeof TASK_SUCCESS;
  payload: {data: any};
}

interface TaskFailedAction {
  type: typeof TASK_FAILED;
  payload: any;
}

interface TaskDestroyAction {
  type: typeof TASK_DESTROY;
}

export type TASK_ACTION_TYPES =
  | TaskRequestAction
  | TaskSuccessAction
  | TaskFailedAction
  | TaskDestroyAction;
