const BASE_NAME = 'ROMBEL';
export const ROMBEL_REQUEST = `${BASE_NAME}_REQUEST`;
export const ROMBEL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ROMBEL_FAILED = `${BASE_NAME}_FAILED`;
export const ROMBEL_DESTROY = `${BASE_NAME}_DESTROY`;

interface RombelRequestAction {
  type: typeof ROMBEL_REQUEST;
}

interface RombelSuccessAction {
  type: typeof ROMBEL_SUCCESS;
  payload: {data: any};
}

interface RombelFailedAction {
  type: typeof ROMBEL_FAILED;
  payload: any;
}

interface RombelDestroyAction {
  type: typeof ROMBEL_DESTROY;
}

export type ROMBEL_ACTION_TYPES =
  | RombelRequestAction
  | RombelSuccessAction
  | RombelFailedAction
  | RombelDestroyAction;
