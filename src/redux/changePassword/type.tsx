const BASE_NAME = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_REQUEST = `${BASE_NAME}_REQUEST`;
export const CHANGE_PASSWORD_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CHANGE_PASSWORD_FAILED = `${BASE_NAME}_FAILED`;
export const CHANGE_PASSWORD_DESTROY = `${BASE_NAME}_DESTROY`;

interface ChangePasswordRequestAction {
  type: typeof CHANGE_PASSWORD_REQUEST;
}

interface ChangePasswordSuccessAction {
  type: typeof CHANGE_PASSWORD_SUCCESS;
  payload: {data: any};
}

interface ChangePasswordFailedAction {
  type: typeof CHANGE_PASSWORD_FAILED;
  payload: any;
}

interface ChangePasswordDestroyAction {
  type: typeof CHANGE_PASSWORD_DESTROY;
}

export type CHANGE_PASSWORD_ACTION_TYPES =
  | ChangePasswordRequestAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailedAction
  | ChangePasswordDestroyAction;
