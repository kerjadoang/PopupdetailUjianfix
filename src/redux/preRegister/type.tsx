const BASE_NAME = 'PRE_REGISTER';
export const PRE_REGISTER_REQUEST = `${BASE_NAME}_REQUEST`;
export const PRE_REGISTER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PRE_REGISTER_FAILED = `${BASE_NAME}_FAILED`;
export const PRE_REGISTER_DESTROY = `${BASE_NAME}_DESTROY`;

interface PreRegisterRequestAction {
  type: typeof PRE_REGISTER_REQUEST;
}

interface PreRegisterSuccessAction {
  type: typeof PRE_REGISTER_SUCCESS;
  payload: {data: any};
}

interface PreRegisterFailedAction {
  type: typeof PRE_REGISTER_FAILED;
  payload: any;
}

interface PreRegisterDestroyAction {
  type: typeof PRE_REGISTER_DESTROY;
}

export type PRE_REGISTER_ACTION_TYPES =
  | PreRegisterRequestAction
  | PreRegisterSuccessAction
  | PreRegisterFailedAction
  | PreRegisterDestroyAction;
