const BASE_NAME = 'SAVE_VIDEO';
export const SAVE_VIDEO_REQUEST = `${BASE_NAME}_REQUEST`;
export const SAVE_VIDEO_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SAVE_VIDEO_FAILED = `${BASE_NAME}_FAILED`;
export const SAVE_VIDEO_DESTROY = `${BASE_NAME}_DESTROY`;

interface SaveVideoRequestAction {
  type: typeof SAVE_VIDEO_REQUEST;
}

interface SaveVideoSuccessAction {
  type: typeof SAVE_VIDEO_SUCCESS;
  payload: {data: any};
}

interface SaveVideoFailedAction {
  type: typeof SAVE_VIDEO_FAILED;
  payload: any;
}

interface SaveVideoDestroyAction {
  type: typeof SAVE_VIDEO_DESTROY;
}

export type SAVE_VIDEO_ACTION_TYPES =
  | SaveVideoRequestAction
  | SaveVideoSuccessAction
  | SaveVideoFailedAction
  | SaveVideoDestroyAction;
