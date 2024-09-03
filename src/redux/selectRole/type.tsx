const BASE_NAME = 'SELECT_ROLE';
export const SELECT_ROLE_REQUEST = `${BASE_NAME}_REQUEST`;
export const SELECT_ROLE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SELECT_ROLE_FAILED = `${BASE_NAME}_FAILED`;
export const SELECT_ROLE_DESTROY = `${BASE_NAME}_DESTROY`;

interface SelectRoleRequestAction {
  type: typeof SELECT_ROLE_REQUEST;
}

interface SelectRoleSuccessAction {
  type: typeof SELECT_ROLE_SUCCESS;
  payload: {data: any};
}

interface SelectRoleFailedAction {
  type: typeof SELECT_ROLE_FAILED;
  payload: any;
}

interface SelectRoleDestroyAction {
  type: typeof SELECT_ROLE_DESTROY;
}

export type SELECT_ROLE_ACTION_TYPES =
  | SelectRoleRequestAction
  | SelectRoleSuccessAction
  | SelectRoleFailedAction
  | SelectRoleDestroyAction;
