const BASE_NAME = 'VIDEO';
export const VIDEO_REQUEST = `${BASE_NAME}_REQUEST`;
export const VIDEO_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const VIDEO_FAILED = `${BASE_NAME}_FAILED`;
export const VIDEO_DESTROY = `${BASE_NAME}_DESTROY`;

interface VideoRequestAction {
  type: typeof VIDEO_REQUEST;
}

interface VideoSuccessAction {
  type: typeof VIDEO_SUCCESS;
  payload: {data: any};
}

interface VideoFailedAction {
  type: typeof VIDEO_FAILED;
  payload: any;
}

interface VideoDestroyAction {
  type: typeof VIDEO_DESTROY;
}

export type VIDEO_ACTION_TYPES =
  | VideoRequestAction
  | VideoSuccessAction
  | VideoFailedAction
  | VideoDestroyAction;
