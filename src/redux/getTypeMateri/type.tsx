const BASE_NAME = 'TYPE_MATERI';
export const TYPE_MATERI_REQUEST = `${BASE_NAME}_REQUEST`;
export const TYPE_MATERI_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const TYPE_MATERI_FAILED = `${BASE_NAME}_FAILED`;
export const TYPE_MATERI_DESTROY = `${BASE_NAME}_DESTROY`;

interface TypeMateriRequestAction {
  type: typeof TYPE_MATERI_REQUEST;
}

interface TypeMateriSuccessAction {
  type: typeof TYPE_MATERI_SUCCESS;
  payload: {data: any};
}

interface TypeMateriFailedAction {
  type: typeof TYPE_MATERI_FAILED;
  payload: any;
}

interface TypeMateriDestroyAction {
  type: typeof TYPE_MATERI_DESTROY;
}

export type TYPE_MATERI_ACTION_TYPES =
  | TypeMateriRequestAction
  | TypeMateriSuccessAction
  | TypeMateriFailedAction
  | TypeMateriDestroyAction;
