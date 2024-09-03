const BASE_NAME = 'LOADING';
export const LOADING_SHOW = `${BASE_NAME}_SHOW`;
export const LOADING_DISMISS = `${BASE_NAME}_DISMISS`;
export const LOADING_DESTROY = `${BASE_NAME}_DESTROY`;

interface ShowLoadingAction {
  type: typeof LOADING_SHOW;
}

export interface IDismissLoading {
  forceDismiss?: boolean;
}

interface DismissLoadingAction {
  type: typeof LOADING_DISMISS;
  payload: IDismissLoading;
}

export type LOADING_ACTION_TYPES = ShowLoadingAction | DismissLoadingAction;
