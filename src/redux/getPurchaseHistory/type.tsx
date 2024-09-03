const BASE_NAME = 'PURCHASE';
export const PURCHASE_REQUEST = `${BASE_NAME}_REQUEST`;
export const PURCHASE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PURCHASE_FAILED = `${BASE_NAME}_FAILED`;
export const PURCHASE_DESTROY = `${BASE_NAME}_DESTROY`;

interface PurchaseRequestAction {
  type: typeof PURCHASE_REQUEST;
}

interface PurchaseSuccessAction {
  type: typeof PURCHASE_SUCCESS;
  payload: {data: any};
}

interface PurchaseFailedAction {
  type: typeof PURCHASE_FAILED;
  payload: any;
}

interface PurchaseDestroyAction {
  type: typeof PURCHASE_DESTROY;
}

export type PURCHASE_ACTION_TYPES =
  | PurchaseRequestAction
  | PurchaseSuccessAction
  | PurchaseFailedAction
  | PurchaseDestroyAction;
