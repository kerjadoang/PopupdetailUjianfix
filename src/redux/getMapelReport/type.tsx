const BASE_NAME = 'MAPEL';
export const MAPEL_REQUEST = `${BASE_NAME}_REQUEST`;
export const MAPEL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const MAPEL_FAILED = `${BASE_NAME}_FAILED`;
export const MAPEL_DESTROY = `${BASE_NAME}_DESTROY`;

interface MapelRequestAction {
  type: typeof MAPEL_REQUEST;
}

interface MapelSuccessAction {
  type: typeof MAPEL_SUCCESS;
  payload: {data: any};
}

interface MapelFailedAction {
  type: typeof MAPEL_FAILED;
  payload: any;
}

interface MapelDestroyAction {
  type: typeof MAPEL_DESTROY;
}

export type MAPEL_ACTION_TYPES =
  | MapelRequestAction
  | MapelSuccessAction
  | MapelFailedAction
  | MapelDestroyAction;
