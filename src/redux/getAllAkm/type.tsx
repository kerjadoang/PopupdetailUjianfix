const BASE_NAME = 'GET_ALL_AKM';
export const GET_ALL_AKM_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_AKM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_AKM_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_AKM_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllAkmRequestAction {
  type: typeof GET_ALL_AKM_REQUEST;
}

interface getAllAkmSuccessAction {
  type: typeof GET_ALL_AKM_SUCCESS;
  payload: {data: any};
}

interface getAllAkmFailedAction {
  type: typeof GET_ALL_AKM_FAILED;
  payload: any;
}

interface getAllAkmDestroyAction {
  type: typeof GET_ALL_AKM_DESTROY;
}

export type GET_ALL_AKM_ACTION_TYPES =
  | getAllAkmRequestAction
  | getAllAkmSuccessAction
  | getAllAkmFailedAction
  | getAllAkmDestroyAction;
