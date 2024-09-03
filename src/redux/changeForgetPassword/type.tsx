const BASE_NAME = 'CHANGE_FORGET_PASSWORD';
export const CHANGE_FORGET_PASSWORD_REQUEST = `${BASE_NAME}_REQUEST`;
export const CHANGE_FORGET_PASSWORD_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CHANGE_FORGET_PASSWORD_FAILED = `${BASE_NAME}_FAILED`;
export const CHANGE_FORGET_PASSWORD_DESTROY = `${BASE_NAME}_DESTROY`;

interface ChangeForgetPasswordRequestAction {
  type: typeof CHANGE_FORGET_PASSWORD_REQUEST;
}

interface ChangeForgetPasswordSuccessAction {
  type: typeof CHANGE_FORGET_PASSWORD_SUCCESS;
  payload: {data: any};
}

interface ChangeForgetPasswordFailedAction {
  type: typeof CHANGE_FORGET_PASSWORD_FAILED;
  payload: any;
}

interface ChangeForgetPasswordDestroyAction {
  type: typeof CHANGE_FORGET_PASSWORD_DESTROY;
}

export type CHANGE_FORGET_PASSWORD_ACTION_TYPES =
  | ChangeForgetPasswordRequestAction
  | ChangeForgetPasswordSuccessAction
  | ChangeForgetPasswordFailedAction
  | ChangeForgetPasswordDestroyAction;
