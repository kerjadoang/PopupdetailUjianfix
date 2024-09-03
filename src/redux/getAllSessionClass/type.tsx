const BASE_NAME = 'GET_ALL_SESSION_CLASS';
export const GET_ALL_SESSION_CLASS_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_SESSION_CLASS_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_SESSION_CLASS_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_SESSION_CLASS_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllSessionClassRequestAction {
  type: typeof GET_ALL_SESSION_CLASS_REQUEST;
}

interface getAllSessionClassSuccessAction {
  type: typeof GET_ALL_SESSION_CLASS_SUCCESS;
  payload: {data: any};
}

interface getAllSessionClassFailedAction {
  type: typeof GET_ALL_SESSION_CLASS_FAILED;
  payload: any;
}

interface getAllSessionClassDestroyAction {
  type: typeof GET_ALL_SESSION_CLASS_DESTROY;
}

export type GET_ALL_SESSION_CLASS_ACTION_TYPES =
  | getAllSessionClassRequestAction
  | getAllSessionClassSuccessAction
  | getAllSessionClassFailedAction
  | getAllSessionClassDestroyAction;
