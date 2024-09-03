const BASE_NAME = 'ERAPORT_DETAIL';
export const ERAPORT_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const ERAPORT_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ERAPORT_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const ERAPORT_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface EraportDetailRequestAction {
  type: typeof ERAPORT_DETAIL_REQUEST;
}

interface EraportDetailSuccessAction {
  type: typeof ERAPORT_DETAIL_SUCCESS;
}

interface EraportDetailFailedAction {
  type: typeof ERAPORT_DETAIL_FAILED;
}

interface EraportDetailDestroyAction {
  type: typeof ERAPORT_DETAIL_DESTROY;
}

export type ERAPORT_DETAIL_ACTION_TYPES =
  | EraportDetailRequestAction
  | EraportDetailSuccessAction
  | EraportDetailFailedAction
  | EraportDetailDestroyAction;
