const BASE_NAME = 'GET_ACTIVITY';
export const GET_ACTIVITY_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ACTIVITY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ACTIVITY_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ACTIVITY_DESTROY = `${BASE_NAME}_DESTROY`;

interface getActivityRequestAction {
  type: typeof GET_ACTIVITY_REQUEST;
}

interface getActivitySuccessAction {
  type: typeof GET_ACTIVITY_SUCCESS;
  payload: {data: any};
}

interface getActivityFailedAction {
  type: typeof GET_ACTIVITY_FAILED;
  payload: any;
}

interface getActivityDestroyAction {
  type: typeof GET_ACTIVITY_DESTROY;
}

export type GET_ACTIVITY_ACTION_TYPES =
  | getActivityRequestAction
  | getActivitySuccessAction
  | getActivityFailedAction
  | getActivityDestroyAction;
