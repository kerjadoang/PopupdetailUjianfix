const BASE_NAME = 'AUTHENTICATION';
export const AUTHENTICATION_REQUEST = `${BASE_NAME}_REQUEST`;
export const AUTHENTICATION_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const AUTHENTICATION_FAILED = `${BASE_NAME}_FAILED`;
export const AUTHENTICATION_DESTROY = `${BASE_NAME}_DESTROY`;

interface AuthenticationRequestAction {
  type: typeof AUTHENTICATION_REQUEST;
}

interface AuthenticationSuccessAction {
  type: typeof AUTHENTICATION_SUCCESS;
  payload: {data: any};
}

interface AuthenticationFailedAction {
  type: typeof AUTHENTICATION_FAILED;
  payload: any;
}

interface AuthenticationDestroyAction {
  type: typeof AUTHENTICATION_DESTROY;
}

export type AUTHENTICATION_ACTION_TYPES =
  | AuthenticationRequestAction
  | AuthenticationSuccessAction
  | AuthenticationFailedAction
  | AuthenticationDestroyAction;
