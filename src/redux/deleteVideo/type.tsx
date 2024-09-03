const BASE_NAME = 'DELETE_VIDEO';
export const DELETE_VIDEO_REQUEST = `${BASE_NAME}_REQUEST`;
export const DELETE_VIDEO_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const DELETE_VIDEO_FAILED = `${BASE_NAME}_FAILED`;
export const DELETE_VIDEO_DESTROY = `${BASE_NAME}_DESTROY`;

interface DeleteVideoRequestAction {
  type: typeof DELETE_VIDEO_REQUEST;
}

interface DeleteVideoSuccessAction {
  type: typeof DELETE_VIDEO_SUCCESS;
  payload: {data: any};
}

interface DeleteVideoFailedAction {
  type: typeof DELETE_VIDEO_FAILED;
  payload: any;
}

interface DeleteVideoDestroyAction {
  type: typeof DELETE_VIDEO_DESTROY;
}

export type DELETE_VIDEO_ACTION_TYPES =
  | DeleteVideoRequestAction
  | DeleteVideoSuccessAction
  | DeleteVideoFailedAction
  | DeleteVideoDestroyAction;
