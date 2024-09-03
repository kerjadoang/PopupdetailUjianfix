const BASE_NAME = 'UPDATE_READ_ALL_ACTIVITY';
export const UPDATE_READ_ALL_ACTIVITY_REQUEST = `${BASE_NAME}_REQUEST`;
export const UPDATE_READ_ALL_ACTIVITY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const UPDATE_READ_ALL_ACTIVITY_FAILED = `${BASE_NAME}_FAILED`;
export const UPDATE_READ_ALL_ACTIVITY_DESTROY = `${BASE_NAME}_DESTROY`;

interface updateReadAllActivityRequestAction {
  type: typeof UPDATE_READ_ALL_ACTIVITY_REQUEST;
}

interface updateReadAllActivitySuccessAction {
  type: typeof UPDATE_READ_ALL_ACTIVITY_SUCCESS;
  payload: {data: any};
}

interface updateReadAllActivityFailedAction {
  type: typeof UPDATE_READ_ALL_ACTIVITY_FAILED;
  payload: any;
}

interface updateReadAllActivityDestroyAction {
  type: typeof UPDATE_READ_ALL_ACTIVITY_DESTROY;
}

export type UPDATE_READ_ALL_ACTIVITY_ACTION_TYPES =
  | updateReadAllActivityRequestAction
  | updateReadAllActivitySuccessAction
  | updateReadAllActivityFailedAction
  | updateReadAllActivityDestroyAction;
