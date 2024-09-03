import {Dispatch} from 'redux';

import {PTN_ACTION_TYPES, SET_USER} from './type';

export const ptnSetUser =
  (payload: object) =>
  async (dispatch: Dispatch<PTN_ACTION_TYPES>): Promise<any> =>
    dispatch({type: SET_USER, payload});
