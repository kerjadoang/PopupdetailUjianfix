const BASE_NAME = 'CHANGE_NUMBER_';
export const CHANGE_NUMBER_REQUEST = `${BASE_NAME}_REQUEST`;
export const CHANGE_NUMBER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CHANGE_NUMBER_FAILED = `${BASE_NAME}_FAILED`;
export const CHANGE_NUMBER_DESTROY = `${BASE_NAME}_DESTROY`;

interface ChangeNumberRequestAction {
  type: typeof CHANGE_NUMBER_REQUEST;
}

interface ChangeNumberSuccessAction {
  type: typeof CHANGE_NUMBER_SUCCESS;
  payload: {data: any};
}

interface ChangeNumberFailedAction {
  type: typeof CHANGE_NUMBER_FAILED;
  payload: any;
}

interface ChangeNumberDestroyAction {
  type: typeof CHANGE_NUMBER_DESTROY;
}

export type CHANGE_NUMBER_ACTION_TYPES =
  | ChangeNumberRequestAction
  | ChangeNumberSuccessAction
  | ChangeNumberFailedAction
  | ChangeNumberDestroyAction;
