const BASE_NAME = 'GET_ADMINISTRATIVE_HISTORY_DETAIL';
export const GET_ADMINISTRATIVE_HISTORY_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ADMINISTRATIVE_HISTORY_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ADMINISTRATIVE_HISTORY_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ADMINISTRATIVE_HISTORY_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAdministrativeHistoryDetailRequestAction {
  type: typeof GET_ADMINISTRATIVE_HISTORY_DETAIL_REQUEST;
}

interface getAdministrativeHistoryDetailSuccessAction {
  type: typeof GET_ADMINISTRATIVE_HISTORY_DETAIL_SUCCESS;
  payload: {data: any};
}

interface getAdministrativeHistoryDetailFailedAction {
  type: typeof GET_ADMINISTRATIVE_HISTORY_DETAIL_FAILED;
  payload: any;
}

interface getAdministrativeHistoryDetailDestroyAction {
  type: typeof GET_ADMINISTRATIVE_HISTORY_DETAIL_DESTROY;
}

export type GET_ADMINISTRATIVE_HISTORY_DETAIL_ACTION_TYPES =
  | getAdministrativeHistoryDetailRequestAction
  | getAdministrativeHistoryDetailSuccessAction
  | getAdministrativeHistoryDetailFailedAction
  | getAdministrativeHistoryDetailDestroyAction;
