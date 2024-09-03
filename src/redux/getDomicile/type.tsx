const BASE_NAME = 'GET_DOMICILE';
export const GET_DOMICILE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_DOMICILE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_DOMICILE_FAILED = `${BASE_NAME}_FAILED`;
export const GET_DOMICILE_DESTROY = `${BASE_NAME}_DESTROY`;

interface getDomicileRequestAction {
  type: typeof GET_DOMICILE_REQUEST;
}

interface getDomicileSuccessAction {
  type: typeof GET_DOMICILE_SUCCESS;
  payload: {data: any};
}

interface getDomicileFailedAction {
  type: typeof GET_DOMICILE_FAILED;
  payload: any;
}

interface getDomicileDestroyAction {
  type: typeof GET_DOMICILE_DESTROY;
}

export type GET_DOMICILE_ACTION_TYPES =
  | getDomicileRequestAction
  | getDomicileSuccessAction
  | getDomicileFailedAction
  | getDomicileDestroyAction;
