const BASE_NAME = 'MAPEL_DM';
export const MAPEL_DM_REQUEST = `${BASE_NAME}_REQUEST`;
export const MAPEL_DM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const MAPEL_DM_FAILED = `${BASE_NAME}_FAILED`;
export const MAPEL_DM_DESTROY = `${BASE_NAME}_DESTROY`;

interface MapelDetailMateriRequestAction {
  type: typeof MAPEL_DM_REQUEST;
}

interface MapelDetailMateriSuccessAction {
  type: typeof MAPEL_DM_SUCCESS;
  payload: {data: any};
}

interface MapelDetailMateriFailedAction {
  type: typeof MAPEL_DM_FAILED;
  payload: any;
}

interface MapelDetailMateriDestroyAction {
  type: typeof MAPEL_DM_DESTROY;
}

export type MAPEL_DM_ACTION_TYPES =
  | MapelDetailMateriRequestAction
  | MapelDetailMateriSuccessAction
  | MapelDetailMateriFailedAction
  | MapelDetailMateriDestroyAction;
