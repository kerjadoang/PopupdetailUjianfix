const BASE_NAME = 'FRCOIN';
export const FRCOIN_REQUEST = `${BASE_NAME}_REQUEST`;
export const FRCOIN_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const FRCOIN_FAILED = `${BASE_NAME}_FAILED`;
export const FRCOIN_DESTROY = `${BASE_NAME}_DESTROY`;

interface FreeCoinRequestAction {
  type: typeof FRCOIN_REQUEST;
}

interface FreeCoinSuccessAction {
  type: typeof FRCOIN_SUCCESS;
  payload: {data: any};
}

interface FreeCoinFailedAction {
  type: typeof FRCOIN_FAILED;
  payload: any;
}

interface FreeCoinDestroyAction {
  type: typeof FRCOIN_DESTROY;
}

export type FRCOIN_ACTION_TYPES =
  | FreeCoinRequestAction
  | FreeCoinSuccessAction
  | FreeCoinFailedAction
  | FreeCoinDestroyAction;
