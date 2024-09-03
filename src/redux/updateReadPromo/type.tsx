const BASE_NAME = 'UPDATE_READ_PROMO';
export const UPDATE_READ_PROMO_REQUEST = `${BASE_NAME}_REQUEST`;
export const UPDATE_READ_PROMO_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const UPDATE_READ_PROMO_FAILED = `${BASE_NAME}_FAILED`;
export const UPDATE_READ_PROMO_DESTROY = `${BASE_NAME}_DESTROY`;

interface updateReadPromoRequestAction {
  type: typeof UPDATE_READ_PROMO_REQUEST;
}

interface updateReadPromoSuccessAction {
  type: typeof UPDATE_READ_PROMO_SUCCESS;
  payload: {data: any};
}

interface updateReadPromoFailedAction {
  type: typeof UPDATE_READ_PROMO_FAILED;
  payload: any;
}

interface updateReadPromoDestroyAction {
  type: typeof UPDATE_READ_PROMO_DESTROY;
}

export type UPDATE_READ_PROMO_ACTION_TYPES =
  | updateReadPromoRequestAction
  | updateReadPromoSuccessAction
  | updateReadPromoFailedAction
  | updateReadPromoDestroyAction;
