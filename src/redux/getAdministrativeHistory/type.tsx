const BASE_NAME = 'GET_ADMINISTRATIVE_HISTORY';
export const GET_ADMINISTRATIVE_HISTORY_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ADMINISTRATIVE_HISTORY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ADMINISTRATIVE_HISTORY_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ADMINISTRATIVE_HISTORY_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAdministrativeHistoryRequestAction {
  type: typeof GET_ADMINISTRATIVE_HISTORY_REQUEST;
}

interface getAdministrativeHistorySuccessAction {
  type: typeof GET_ADMINISTRATIVE_HISTORY_SUCCESS;
  payload: {data: any};
}

interface getAdministrativeHistoryFailedAction {
  type: typeof GET_ADMINISTRATIVE_HISTORY_FAILED;
  payload: any;
}

interface getAdministrativeHistoryDestroyAction {
  type: typeof GET_ADMINISTRATIVE_HISTORY_DESTROY;
}

export type GET_ADMINISTRATIVE_HISTORY_ACTION_TYPES =
  | getAdministrativeHistoryRequestAction
  | getAdministrativeHistorySuccessAction
  | getAdministrativeHistoryFailedAction
  | getAdministrativeHistoryDestroyAction;
