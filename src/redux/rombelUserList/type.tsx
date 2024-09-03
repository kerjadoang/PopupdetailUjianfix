const BASE_NAME = 'ROMBEL_USER_LIST';
export const ROMBEL_USER_LIST_REQUEST = `${BASE_NAME}_REQUEST`;
export const ROMBEL_USER_LIST_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ROMBEL_USER_LIST_FAILED = `${BASE_NAME}_FAILED`;
export const ROMBEL_USER_LIST_DESTROY = `${BASE_NAME}_DESTROY`;

interface getRombelUserListRequestAction {
  type: typeof ROMBEL_USER_LIST_REQUEST;
}

interface getRombelUserListSuccessAction {
  type: typeof ROMBEL_USER_LIST_SUCCESS;
  payload: {data: any};
}

interface getRombelUserListFailedAction {
  type: typeof ROMBEL_USER_LIST_FAILED;
  payload: any;
}

interface getRombelUserListDestroyAction {
  type: typeof ROMBEL_USER_LIST_DESTROY;
}

export type ROMBEL_USER_LIST_ACTION_TYPES =
  | getRombelUserListRequestAction
  | getRombelUserListSuccessAction
  | getRombelUserListFailedAction
  | getRombelUserListDestroyAction;
