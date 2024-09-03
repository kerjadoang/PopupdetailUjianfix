const BASE_NAME_LIST = 'GET_LIST_PANCASILA_PROJECT';
export const GET_LIST_PANCASILA_PROJECT_REQUEST = `${BASE_NAME_LIST}_REQUEST`;
export const GET_LIST_PANCASILA_PROJECT_SUCCESS = `${BASE_NAME_LIST}_SUCCESS`;
export const GET_LIST_PANCASILA_PROJECT_FAILED = `${BASE_NAME_LIST}_FAILED`;
export const GET_LIST_PANCASILA_PROJECT_DESTROY = `${BASE_NAME_LIST}_DESTROY`;

const BASE_NAME_HISTORY = 'GET_HISTORY_PANCASILA_PROJECT';
export const GET_HISTORY_PANCASILA_PROJECT_REQUEST = `${BASE_NAME_HISTORY}_REQUEST`;
export const GET_HISTORY_PANCASILA_PROJECT_SUCCESS = `${BASE_NAME_HISTORY}_SUCCESS`;
export const GET_HISTORY_PANCASILA_PROJECT_FAILED = `${BASE_NAME_HISTORY}_FAILED`;
export const GET_HISTORY_PANCASILA_PROJECT_DESTROY = `${BASE_NAME_HISTORY}_DESTROY`;

interface getListPancasilaProjectRequestAction {
  type: typeof GET_LIST_PANCASILA_PROJECT_REQUEST;
}

interface getListPancasilaProjectSuccessAction {
  type: typeof GET_LIST_PANCASILA_PROJECT_SUCCESS;
  payload: {data: any};
}

interface getListPancasilaProjectFailedAction {
  type: typeof GET_LIST_PANCASILA_PROJECT_FAILED;
  payload: any;
}

interface getListPancasilaProjectDestroyAction {
  type: typeof GET_LIST_PANCASILA_PROJECT_DESTROY;
}

interface getHistoryPancasilaProjectRequestAction {
  type: typeof GET_HISTORY_PANCASILA_PROJECT_REQUEST;
}

interface getHistoryPancasilaProjectSuccessAction {
  type: typeof GET_HISTORY_PANCASILA_PROJECT_SUCCESS;
  payload: {data: any};
}

interface getHistoryPancasilaProjectFailedAction {
  type: typeof GET_HISTORY_PANCASILA_PROJECT_FAILED;
  payload: any;
}

interface getHistoryPancasilaProjectDestroyAction {
  type: typeof GET_HISTORY_PANCASILA_PROJECT_DESTROY;
}

export type GET_LIST_PANCASILA_PROJECT_ACTION_TYPES =
  | getListPancasilaProjectRequestAction
  | getListPancasilaProjectSuccessAction
  | getListPancasilaProjectFailedAction
  | getListPancasilaProjectDestroyAction;

export type GET_HISTORY_PANCASILA_PROJECT_ACTION_TYPES =
  | getHistoryPancasilaProjectRequestAction
  | getHistoryPancasilaProjectSuccessAction
  | getHistoryPancasilaProjectFailedAction
  | getHistoryPancasilaProjectDestroyAction;
