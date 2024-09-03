const BASE_NAME = 'PUT_ACCEPT_ABSENT_REQUEST';
export const PUT_ACCEPT_ABSENT_REQUEST_REQUEST = `${BASE_NAME}_REQUEST`;
export const PUT_ACCEPT_ABSENT_REQUEST_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PUT_ACCEPT_ABSENT_REQUEST_FAILED = `${BASE_NAME}_FAILED`;
export const PUT_ACCEPT_ABSENT_REQUEST_DESTROY = `${BASE_NAME}_DESTROY`;

interface putAcceptAbsentRequestRequestAction {
  type: typeof PUT_ACCEPT_ABSENT_REQUEST_REQUEST;
}

interface putAcceptAbsentRequestSuccessAction {
  type: typeof PUT_ACCEPT_ABSENT_REQUEST_SUCCESS;
  payload: {data: any};
}

interface putAcceptAbsentRequestFailedAction {
  type: typeof PUT_ACCEPT_ABSENT_REQUEST_FAILED;
  payload: any;
}

interface putAcceptAbsentRequestDestroyAction {
  type: typeof PUT_ACCEPT_ABSENT_REQUEST_DESTROY;
}

export type PUT_ACCEPT_ABSENT_REQUEST_ACTION_TYPES =
  | putAcceptAbsentRequestRequestAction
  | putAcceptAbsentRequestSuccessAction
  | putAcceptAbsentRequestFailedAction
  | putAcceptAbsentRequestDestroyAction;
