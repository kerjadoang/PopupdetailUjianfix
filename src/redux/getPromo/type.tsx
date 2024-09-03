const BASE_NAME = 'GET_PROMO';
export const GET_PROMO_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_PROMO_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_PROMO_FAILED = `${BASE_NAME}_FAILED`;
export const GET_PROMO_DESTROY = `${BASE_NAME}_DESTROY`;

interface getPromoRequestAction {
  type: typeof GET_PROMO_REQUEST;
}

interface getPromoSuccessAction {
  type: typeof GET_PROMO_SUCCESS;
  payload: {data: any};
}

interface getPromoFailedAction {
  type: typeof GET_PROMO_FAILED;
  payload: any;
}

interface getPromoDestroyAction {
  type: typeof GET_PROMO_DESTROY;
}

export type GET_PROMO_ACTION_TYPES =
  | getPromoRequestAction
  | getPromoSuccessAction
  | getPromoFailedAction
  | getPromoDestroyAction;
