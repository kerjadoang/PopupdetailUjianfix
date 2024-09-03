const BASE_NAME = 'LOGIN';
export const LOGIN_REQUEST = `${BASE_NAME}_REQUEST`;
export const LOGIN_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const LOGIN_FAILED = `${BASE_NAME}_FAILED`;
export const LOGIN_DESTROY = `${BASE_NAME}_DESTROY`;

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {data: any};
}

interface LoginFailedAction {
  type: typeof LOGIN_FAILED;
  payload: any;
}

interface LoginDestroyAction {
  type: typeof LOGIN_DESTROY;
}

export type LOGIN_ACTION_TYPES =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailedAction
  | LoginDestroyAction;
