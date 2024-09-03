const BASE_NAME = 'ASK';
export const ASK_REQUEST = `${BASE_NAME}_REQUEST`;
export const ASK_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ASK_FAILED = `${BASE_NAME}_FAILED`;
export const ASK_DESTROY = `${BASE_NAME}_DESTROY`;

interface AskRequestAction {
  type: typeof ASK_REQUEST;
}

interface AskSuccessAction {
  type: typeof ASK_SUCCESS;
  payload: {data: any};
}

interface AskFailedAction {
  type: typeof ASK_FAILED;
  payload: any;
}

interface AskDestroyAction {
  type: typeof ASK_DESTROY;
}

export type ASK_ACTION_TYPES =
  | AskRequestAction
  | AskSuccessAction
  | AskFailedAction
  | AskDestroyAction;
