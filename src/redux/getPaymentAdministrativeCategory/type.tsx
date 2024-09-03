const BASE_NAME = 'GET_PAYMENT_ADMINISTRATIVE_CATEGORY';
export const GET_PAYMENT_ADMINISTRATIVE_CATEGORY_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_PAYMENT_ADMINISTRATIVE_CATEGORY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_PAYMENT_ADMINISTRATIVE_CATEGORY_FAILED = `${BASE_NAME}_FAILED`;
export const GET_PAYMENT_ADMINISTRATIVE_CATEGORY_DESTROY = `${BASE_NAME}_DESTROY`;

interface GetPaymentAdmistrativeCategoryRequestAction {
  type: typeof GET_PAYMENT_ADMINISTRATIVE_CATEGORY_REQUEST;
}

interface GetPaymentAdmistrativeCategorySuccessAction {
  type: typeof GET_PAYMENT_ADMINISTRATIVE_CATEGORY_SUCCESS;
  payload: {data: any};
}

interface GetPaymentAdmistrativeCategoryFailedAction {
  type: typeof GET_PAYMENT_ADMINISTRATIVE_CATEGORY_FAILED;
  payload: any;
}

interface GetPaymentAdmistrativeCategoryDestroyAction {
  type: typeof GET_PAYMENT_ADMINISTRATIVE_CATEGORY_DESTROY;
}

export type GET_PAYMENT_ADMINISTRATIVE_CATEGORY_ACTION_TYPES =
  | GetPaymentAdmistrativeCategoryRequestAction
  | GetPaymentAdmistrativeCategorySuccessAction
  | GetPaymentAdmistrativeCategoryFailedAction
  | GetPaymentAdmistrativeCategoryDestroyAction;
