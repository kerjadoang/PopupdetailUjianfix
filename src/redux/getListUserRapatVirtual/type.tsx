const BASE_NAME = 'LIST_USER_RAPAT_VIRTUAL';
export const LIST_USER_RAPAT_VIRTUAL_REQUEST = `${BASE_NAME}_REQUEST`;
export const LIST_USER_RAPAT_VIRTUAL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const LIST_USER_RAPAT_VIRTUAL_FAILED = `${BASE_NAME}_FAILED`;
export const LIST_USER_RAPAT_VIRTUAL_DESTROY = `${BASE_NAME}_DESTROY`;

interface ListUserRapatVirtualRequestAction {
  type: typeof LIST_USER_RAPAT_VIRTUAL_REQUEST;
}

interface ListUserRapatVirtualSuccessAction {
  type: typeof LIST_USER_RAPAT_VIRTUAL_SUCCESS;
  payload: {data: any};
}

interface ListUserRapatVirtualFailedAction {
  type: typeof LIST_USER_RAPAT_VIRTUAL_FAILED;
  payload: any;
}

interface ListUserRapatVirtualDestroyAction {
  type: typeof LIST_USER_RAPAT_VIRTUAL_DESTROY;
}

export type LIST_USER_RAPAT_VIRTUAL_ACTION_TYPES =
  | ListUserRapatVirtualRequestAction
  | ListUserRapatVirtualSuccessAction
  | ListUserRapatVirtualFailedAction
  | ListUserRapatVirtualDestroyAction;
