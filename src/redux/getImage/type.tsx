const BASE_NAME = 'IMAGE';
export const IMAGE_REQUEST = `${BASE_NAME}_REQUEST`;
export const IMAGE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const IMAGE_FAILED = `${BASE_NAME}_FAILED`;
export const IMAGE_DESTROY = `${BASE_NAME}_DESTROY`;

interface ImageRequestAction {
  type: typeof IMAGE_REQUEST;
}

interface ImageSuccessAction {
  type: typeof IMAGE_SUCCESS;
  payload: {data: any};
}

interface ImageFailedAction {
  type: typeof IMAGE_FAILED;
  payload: any;
}

interface ImageDestroyAction {
  type: typeof IMAGE_DESTROY;
}

export type IMAGE_ACTION_TYPES =
  | ImageRequestAction
  | ImageSuccessAction
  | ImageFailedAction
  | ImageDestroyAction;
