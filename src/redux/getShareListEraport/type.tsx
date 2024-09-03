const BASE_NAME = 'ERAPORT_SL';
export const ERAPORT_SL_REQUEST = `${BASE_NAME}_REQUEST`;
export const ERAPORT_SL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ERAPORT_SL_FAILED = `${BASE_NAME}_FAILED`;
export const ERAPORT_SL_DESTROY = `${BASE_NAME}_DESTROY`;

interface EraportShareListRequestAction {
  type: typeof ERAPORT_SL_REQUEST;
}

interface EraportShareListSuccessAction {
  type: typeof ERAPORT_SL_SUCCESS;
  payload: {data: any};
}

interface EraportShareListFailedAction {
  type: typeof ERAPORT_SL_FAILED;
  payload: any;
}

interface EraportShareListDestroyAction {
  type: typeof ERAPORT_SL_DESTROY;
}

export type ERAPORT_SL_ACTION_TYPES =
  | EraportShareListRequestAction
  | EraportShareListSuccessAction
  | EraportShareListFailedAction
  | EraportShareListDestroyAction;
