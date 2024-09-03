const BASE_NAME = 'LIST_ACTIVITY';
export const LIST_ACTIVITY_REQUEST = `${BASE_NAME}_REQUEST`;
export const LIST_ACTIVITY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const LIST_ACTIVITY_FAILED = `${BASE_NAME}_FAILED`;
export const LIST_ACTIVITY_DESTROY = `${BASE_NAME}_DESTROY`;

interface ListActivityRequestAction {
  type: typeof LIST_ACTIVITY_REQUEST;
}

interface ListActivitySuccessAction {
  type: typeof LIST_ACTIVITY_SUCCESS;
  payload: {data: any};
}

interface ListActivityFailedAction {
  type: typeof LIST_ACTIVITY_FAILED;
  payload: any;
}

interface ListActivityDestroyAction {
  type: typeof LIST_ACTIVITY_DESTROY;
}

export type LIST_ACTIVITY_ACTION_TYPES =
  | ListActivityRequestAction
  | ListActivitySuccessAction
  | ListActivityFailedAction
  | ListActivityDestroyAction;
