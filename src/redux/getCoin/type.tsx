const BASE_NAME = 'COIN';
export const COIN_REQUEST = `${BASE_NAME}_REQUEST`;
export const COIN_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const COIN_FAILED = `${BASE_NAME}_FAILED`;
export const COIN_DESTROY = `${BASE_NAME}_DESTROY`;

interface CoinRequestAction {
  type: typeof COIN_REQUEST;
}

interface CoinSuccessAction {
  type: typeof COIN_SUCCESS;
  payload: {data: any};
}

interface CoinFailedAction {
  type: typeof COIN_FAILED;
  payload: any;
}

interface CoinDestroyAction {
  type: typeof COIN_DESTROY;
}

export type COIN_ACTION_TYPES =
  | CoinRequestAction
  | CoinSuccessAction
  | CoinFailedAction
  | CoinDestroyAction;
