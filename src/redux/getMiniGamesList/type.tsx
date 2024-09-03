const BASE_NAME = 'GET_MINI_GAMES';
export const GET_MINI_GAMES_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_MINI_GAMES_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_MINI_GAMES_FAILED = `${BASE_NAME}_FAILED`;
export const GET_MINI_GAMES_DESTROY = `${BASE_NAME}_DESTROY`;

interface getMiniGameListRequestAction {
  type: typeof GET_MINI_GAMES_REQUEST;
}

interface getMiniGameListSuccessAction {
  type: typeof GET_MINI_GAMES_SUCCESS;
  payload: {data: any};
}

interface getMiniGameListFailedAction {
  type: typeof GET_MINI_GAMES_FAILED;
  payload: any;
}

interface getMiniGameListDestroyAction {
  type: typeof GET_MINI_GAMES_DESTROY;
}

export type GET_MINI_GAMES_ACTION_TYPES =
  | getMiniGameListRequestAction
  | getMiniGameListSuccessAction
  | getMiniGameListFailedAction
  | getMiniGameListDestroyAction;
