const BASE_NAME = 'GET_USER';
export const GET_USER_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_USER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_USER_FAILED = `${BASE_NAME}_FAILED`;
export const GET_USER_REFETCH = `${BASE_NAME}_REFETCH`;
export const GET_USER_DESTROY = `${BASE_NAME}_DESTROY`;
export const GET_USER_STORE_TOKEN = `${BASE_NAME}_STORE_TOKEN`;

interface GetUserRequestAction {
  type: typeof GET_USER_REQUEST;
}
interface GetUserRefetchAction {
  type: typeof GET_USER_REFETCH;
}

interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  payload: {data: any};
}

interface GetUserFailedAction {
  type: typeof GET_USER_FAILED;
  payload: any;
}

interface GetUserDestroyAction {
  type: typeof GET_USER_DESTROY;
}
interface GetUserStoreTokenAction {
  type: typeof GET_USER_STORE_TOKEN;
}

export type GET_USER_ACTION_TYPES =
  | GetUserStoreTokenAction
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailedAction
  | GetUserRefetchAction
  | GetUserDestroyAction;
