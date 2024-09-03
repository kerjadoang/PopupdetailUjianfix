const BASE_NAME = 'DURATION_SUMMARY';
export const DURATION_SUMMARY_REQUEST = `${BASE_NAME}_REQUEST`;
export const DURATION_SUMMARY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const DURATION_SUMMARY_FAILED = `${BASE_NAME}_FAILED`;
export const DURATION_SUMMARY_DESTROY = `${BASE_NAME}_DESTROY`;

interface DurationSummaryRequestAction {
  type: typeof DURATION_SUMMARY_REQUEST;
}

interface DurationSummarySuccessAction {
  type: typeof DURATION_SUMMARY_SUCCESS;
  payload: {data: any};
}

interface DurationSummaryFailedAction {
  type: typeof DURATION_SUMMARY_FAILED;
  payload: any;
}

interface DurationSummaryDestroyAction {
  type: typeof DURATION_SUMMARY_DESTROY;
}

export type DURATION_SUMMARY_ACTION_TYPES =
  | DurationSummaryRequestAction
  | DurationSummarySuccessAction
  | DurationSummaryFailedAction
  | DurationSummaryDestroyAction;
