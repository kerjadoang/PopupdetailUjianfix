const BASE_NAME = 'CHECK_TANYA';
export const CHECK_TANYA_REQUEST = `${BASE_NAME}_REQUEST`;
export const CHECK_TANYA_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CHECK_TANYA_FAILED = `${BASE_NAME}_FAILED`;
export const CHECK_TANYA_DESTROY = `${BASE_NAME}_DESTROY`;

interface CheckTanyaRequestAction {
  type: typeof CHECK_TANYA_REQUEST;
}

interface CheckTanyaSuccessAction {
  type: typeof CHECK_TANYA_SUCCESS;
  payload: {data: any};
}

interface CheckTanyaFailedAction {
  type: typeof CHECK_TANYA_FAILED;
  payload: any;
}

interface CheckTanyaDestroyAction {
  type: typeof CHECK_TANYA_DESTROY;
}

export type CHECK_TANYA_ACTION_TYPES =
  | CheckTanyaRequestAction
  | CheckTanyaSuccessAction
  | CheckTanyaFailedAction
  | CheckTanyaDestroyAction;
