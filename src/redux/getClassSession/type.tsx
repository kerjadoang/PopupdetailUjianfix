const BASE_NAME = 'CLASS_SESSION';
export const CLASS_SESSION_REQUEST = `${BASE_NAME}_REQUEST`;
export const CLASS_SESSION_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CLASS_SESSION_FAILED = `${BASE_NAME}_FAILED`;
export const CLASS_SESSION_DESTROY = `${BASE_NAME}_DESTROY`;

interface ClassSessionRequestAction {
  type: typeof CLASS_SESSION_REQUEST;
}

interface ClassSessionSuccessAction {
  type: typeof CLASS_SESSION_SUCCESS;
  payload: {data: any};
}

interface ClassSessionFailedAction {
  type: typeof CLASS_SESSION_FAILED;
  payload: any;
}

interface ClassSessionDestroyAction {
  type: typeof CLASS_SESSION_DESTROY;
}

export type CLASS_SESSION_ACTION_TYPES =
  | ClassSessionRequestAction
  | ClassSessionSuccessAction
  | ClassSessionFailedAction
  | ClassSessionDestroyAction;
