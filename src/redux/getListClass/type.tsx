const BASE_NAME = 'LIST_CLASS';
export const LIST_CLASS_REQUEST = `${BASE_NAME}_REQUEST`;
export const LIST_CLASS_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const LIST_CLASS_FAILED = `${BASE_NAME}_FAILED`;
export const LIST_CLASS_DESTROY = `${BASE_NAME}_DESTROY`;

interface ListClassRequestAction {
  type: typeof LIST_CLASS_REQUEST;
}

interface ListClassSuccessAction {
  type: typeof LIST_CLASS_SUCCESS;
  payload: {data: any};
}

interface ListClassFailedAction {
  type: typeof LIST_CLASS_FAILED;
  payload: any;
}

interface ListClassDestroyAction {
  type: typeof LIST_CLASS_DESTROY;
}

export type LIST_CLASS_ACTION_TYPES =
  | ListClassRequestAction
  | ListClassSuccessAction
  | ListClassFailedAction
  | ListClassDestroyAction;
