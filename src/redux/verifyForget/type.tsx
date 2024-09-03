const BASE_NAME = 'VERIFY_FORGET';
export const VERIFY_FORGET_REQUEST = `${BASE_NAME}_REQUEST`;
export const VERIFY_FORGET_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const VERIFY_FORGET_FAILED = `${BASE_NAME}_FAILED`;
export const VERIFY_FORGET_DESTROY = `${BASE_NAME}_DESTROY`;

interface verifyForgetRequestAction {
  type: typeof VERIFY_FORGET_REQUEST;
}

interface verifyForgetSuccessAction {
  type: typeof VERIFY_FORGET_SUCCESS;
  payload: {data: any};
}

interface verifyForgetFailedAction {
  type: typeof VERIFY_FORGET_FAILED;
  payload: any;
}

interface verifyForgetDestroyAction {
  type: typeof VERIFY_FORGET_DESTROY;
}

export type VERIFY_FORGET_ACTION_TYPES =
  | verifyForgetRequestAction
  | verifyForgetSuccessAction
  | verifyForgetFailedAction
  | verifyForgetDestroyAction;
