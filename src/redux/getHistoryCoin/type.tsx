const BASE_NAME = 'HISTORY_COIN';
export const HISTORY_COIN_REQUEST = `${BASE_NAME}_REQUEST`;
export const HISTORY_COIN_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const HISTORY_COIN_FAILED = `${BASE_NAME}_FAILED`;
export const HISTORY_COIN_DESTROY = `${BASE_NAME}_DESTROY`;

interface HistoryCoinRequestAction {
  type: typeof HISTORY_COIN_REQUEST;
}

interface HistoryCoinSuccessAction {
  type: typeof HISTORY_COIN_SUCCESS;
  payload: {data: any};
}

interface HistoryCoinFailedAction {
  type: typeof HISTORY_COIN_FAILED;
  payload: any;
}

interface HistoryCoinDestroyAction {
  type: typeof HISTORY_COIN_DESTROY;
}

export type HISTORY_COIN_ACTION_TYPES =
  | HistoryCoinRequestAction
  | HistoryCoinSuccessAction
  | HistoryCoinFailedAction
  | HistoryCoinDestroyAction;
