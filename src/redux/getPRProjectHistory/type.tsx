const BASE_NAME_HISTORY = 'GET_PR_PROJECT_HISTORY';
export const GET_PR_PROJECT_HISTORY_REQUEST = `${BASE_NAME_HISTORY}_REQUEST`;
export const GET_PR_PROJECT_HISTORY_SUCCESS = `${BASE_NAME_HISTORY}_SUCCESS`;
export const GET_PR_PROJECT_HISTORY_FAILED = `${BASE_NAME_HISTORY}_FAILED`;
export const GET_PR_PROJECT_HISTORY_DESTROY = `${BASE_NAME_HISTORY}_DESTROY`;

interface getPRProjectHistoryRequestAction {
  type: typeof GET_PR_PROJECT_HISTORY_REQUEST;
}

interface getPRProjectHistorySuccessAction {
  type: typeof GET_PR_PROJECT_HISTORY_SUCCESS;
  payload: {data: any};
}

interface getPRProjectHistoryFailedAction {
  type: typeof GET_PR_PROJECT_HISTORY_FAILED;
  payload: any;
}

interface getPRProjectHistoryDestroyAction {
  type: typeof GET_PR_PROJECT_HISTORY_DESTROY;
}

export type GET_PR_PROJECT_HISTORY_ACTION_TYPES =
  | getPRProjectHistoryRequestAction
  | getPRProjectHistorySuccessAction
  | getPRProjectHistoryFailedAction
  | getPRProjectHistoryDestroyAction;
