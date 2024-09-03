const BASE_NAME = 'RAPOR_HISTORY';
export const RAPOR_HISTORY_REQUEST = `${BASE_NAME}_REQUEST`;
export const RAPOR_HISTORY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const RAPOR_HISTORY_FAILED = `${BASE_NAME}_FAILED`;
export const RAPOR_HISTORY_DESTROY = `${BASE_NAME}_DESTROY`;

interface getRaporHistoryListRequestAction {
  type: typeof RAPOR_HISTORY_REQUEST;
}

interface getRaporHistoryListSuccessAction {
  type: typeof RAPOR_HISTORY_SUCCESS;
  payload: {data: any};
}

interface getRaporHistoryListFailedAction {
  type: typeof RAPOR_HISTORY_FAILED;
  payload: any;
}

interface getRaporHistoryListDestroyAction {
  type: typeof RAPOR_HISTORY_DESTROY;
}

export type RAPOR_HISTORY_ACTION_TYPES =
  | getRaporHistoryListRequestAction
  | getRaporHistoryListSuccessAction
  | getRaporHistoryListFailedAction
  | getRaporHistoryListDestroyAction;
