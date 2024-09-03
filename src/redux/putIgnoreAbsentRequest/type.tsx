const BASE_NAME = 'PUT_IGNORE_ABSENT_REQUEST';
export const PUT_IGNORE_ABSENT_REQUEST_REQUEST = `${BASE_NAME}_REQUEST`;
export const PUT_IGNORE_ABSENT_REQUEST_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PUT_IGNORE_ABSENT_REQUEST_FAILED = `${BASE_NAME}_FAILED`;
export const PUT_IGNORE_ABSENT_REQUEST_DESTROY = `${BASE_NAME}_DESTROY`;

interface putIgnoreAbsentRequestRequestAction {
  type: typeof PUT_IGNORE_ABSENT_REQUEST_REQUEST;
}

interface putIgnoreAbsentRequestSuccessAction {
  type: typeof PUT_IGNORE_ABSENT_REQUEST_SUCCESS;
  payload: {data: any};
}

interface putIgnoreAbsentRequestFailedAction {
  type: typeof PUT_IGNORE_ABSENT_REQUEST_FAILED;
  payload: any;
}

interface putIgnoreAbsentRequestDestroyAction {
  type: typeof PUT_IGNORE_ABSENT_REQUEST_DESTROY;
}

export type PUT_IGNORE_ABSENT_REQUEST_ACTION_TYPES =
  | putIgnoreAbsentRequestRequestAction
  | putIgnoreAbsentRequestSuccessAction
  | putIgnoreAbsentRequestFailedAction
  | putIgnoreAbsentRequestDestroyAction;
