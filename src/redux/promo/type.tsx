const BASE_NAME = 'PROMO';
export const PROMO_REQUEST = `${BASE_NAME}_REQUEST`;
export const PROMO_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PROMO_FAILED = `${BASE_NAME}_FAILED`;
export const PROMO_DESTROY = `${BASE_NAME}_DESTROY`;

interface PromoRequestAction {
  type: typeof PROMO_REQUEST;
}

interface PromoSuccessAction {
  type: typeof PROMO_SUCCESS;
  payload: {data: any};
}

interface PromoFailedAction {
  type: typeof PROMO_FAILED;
  payload: any;
}

interface PromoDestroyAction {
  type: typeof PROMO_DESTROY;
}

export type PROMO_ACTION_TYPES =
  | PromoRequestAction
  | PromoSuccessAction
  | PromoFailedAction
  | PromoDestroyAction;
