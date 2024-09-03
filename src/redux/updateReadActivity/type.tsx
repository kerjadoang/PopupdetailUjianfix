const BASE_NAME = 'UPDATE_READ_ACTIVITY';
export const UPDATE_READ_ACTIVITY_REQUEST = `${BASE_NAME}_REQUEST`;
export const UPDATE_READ_ACTIVITY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const UPDATE_READ_ACTIVITY_FAILED = `${BASE_NAME}_FAILED`;
export const UPDATE_READ_ACTIVITY_DESTROY = `${BASE_NAME}_DESTROY`;

interface updateReadActivityRequestAction {
  type: typeof UPDATE_READ_ACTIVITY_REQUEST;
}

interface updateReadActivitySuccessAction {
  type: typeof UPDATE_READ_ACTIVITY_SUCCESS;
  payload: {data: any};
}

interface updateReadActivityFailedAction {
  type: typeof UPDATE_READ_ACTIVITY_FAILED;
  payload: any;
}

interface updateReadActivityDestroyAction {
  type: typeof UPDATE_READ_ACTIVITY_DESTROY;
}

export type UPDATE_READ_ACTIVITY_ACTION_TYPES =
  | updateReadActivityRequestAction
  | updateReadActivitySuccessAction
  | updateReadActivityFailedAction
  | updateReadActivityDestroyAction;
