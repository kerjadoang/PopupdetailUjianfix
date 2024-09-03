const BASE_NAME = 'PTN';

export const SET_USER = `${BASE_NAME}_SET_USER`;

interface setUserAction {
  type: typeof SET_USER;
  payload: object;
}

export type PTN_ACTION_TYPES = setUserAction;
