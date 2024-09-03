const BASE_NAME = 'PURCHASE_DETAIL';
export const PURCHASE_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const PURCHASE_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PURCHASE_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const PURCHASE_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface PurchaseDetailRequestAction {
  type: typeof PURCHASE_DETAIL_REQUEST;
}

interface PurchaseDetailSuccessAction {
  type: typeof PURCHASE_DETAIL_SUCCESS;
  payload: {data: any};
}

interface PurchaseDetailFailedAction {
  type: typeof PURCHASE_DETAIL_FAILED;
  payload: any;
}

interface PurchaseDetailDestroyAction {
  type: typeof PURCHASE_DETAIL_DESTROY;
}

export type PURCHASE_DETAIL_ACTION_TYPES =
  | PurchaseDetailRequestAction
  | PurchaseDetailSuccessAction
  | PurchaseDetailFailedAction
  | PurchaseDetailDestroyAction;
