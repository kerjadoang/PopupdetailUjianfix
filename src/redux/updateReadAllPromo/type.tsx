const BASE_NAME = 'UPDATE_READ_ALL_PROMO';
export const UPDATE_READ_ALL_PROMO_REQUEST = `${BASE_NAME}_REQUEST`;
export const UPDATE_READ_ALL_PROMO_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const UPDATE_READ_ALL_PROMO_FAILED = `${BASE_NAME}_FAILED`;
export const UPDATE_READ_ALL_PROMO_DESTROY = `${BASE_NAME}_DESTROY`;

interface updateReadAllPromoRequestAction {
  type: typeof UPDATE_READ_ALL_PROMO_REQUEST;
}

interface updateReadAllPromoSuccessAction {
  type: typeof UPDATE_READ_ALL_PROMO_SUCCESS;
  payload: {data: any};
}

interface updateReadAllPromoFailedAction {
  type: typeof UPDATE_READ_ALL_PROMO_FAILED;
  payload: any;
}

interface updateReadAllPromoDestroyAction {
  type: typeof UPDATE_READ_ALL_PROMO_DESTROY;
}

export type UPDATE_READ_ALL_PROMO_ACTION_TYPES =
  | updateReadAllPromoRequestAction
  | updateReadAllPromoSuccessAction
  | updateReadAllPromoFailedAction
  | updateReadAllPromoDestroyAction;
