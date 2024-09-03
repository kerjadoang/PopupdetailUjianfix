const BASE_NAME = 'ROMBEL_CLASS_LIST';
export const ROMBEL_CLASS_LIST_REQUEST = `${BASE_NAME}_REQUEST`;
export const ROMBEL_CLASS_LIST_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ROMBEL_CLASS_LIST_FAILED = `${BASE_NAME}_FAILED`;
export const ROMBEL_CLASS_LIST_DESTROY = `${BASE_NAME}_DESTROY`;

interface getRombelClassListRequestAction {
  type: typeof ROMBEL_CLASS_LIST_REQUEST;
}

interface getRombelClassListSuccessAction {
  type: typeof ROMBEL_CLASS_LIST_SUCCESS;
  payload: {data: any};
}

interface getRombelClassListFailedAction {
  type: typeof ROMBEL_CLASS_LIST_FAILED;
  payload: any;
}

interface getRombelClassListDestroyAction {
  type: typeof ROMBEL_CLASS_LIST_DESTROY;
}

export type ROMBEL_CLASS_LIST_ACTION_TYPES =
  | getRombelClassListRequestAction
  | getRombelClassListSuccessAction
  | getRombelClassListFailedAction
  | getRombelClassListDestroyAction;
