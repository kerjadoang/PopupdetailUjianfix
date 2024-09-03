const BASE_NAME = 'SUMMARY_TRYOUT';
export const SUMMARY_TRYOUT_REQUEST = `${BASE_NAME}_REQUEST`;
export const SUMMARY_TRYOUT_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SUMMARY_TRYOUT_FAILED = `${BASE_NAME}_FAILED`;
export const SUMMARY_TRYOUT_DESTROY = `${BASE_NAME}_DESTROY`;

interface summaryTryoutRequestAction {
  type: typeof SUMMARY_TRYOUT_REQUEST;
}

interface summaryTryoutSuccessAction {
  type: typeof SUMMARY_TRYOUT_SUCCESS;
  payload: {data: any};
}

interface summaryTryoutFailedAction {
  type: typeof SUMMARY_TRYOUT_FAILED;
  payload: any;
}

interface summaryTryoutDestroyAction {
  type: typeof SUMMARY_TRYOUT_DESTROY;
}

export type SUMMARY_TRYOUT_ACTION_TYPES =
  | summaryTryoutRequestAction
  | summaryTryoutSuccessAction
  | summaryTryoutFailedAction
  | summaryTryoutDestroyAction;
