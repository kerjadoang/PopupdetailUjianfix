import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_DESTROY,
  LOGIN_ACTION_TYPES,
} from './type';

import api from '@api';
import {dismissLoading, showLoading} from '@constants/functional';
import {URL_PATH} from '@constants/url';

import {Dispatch} from 'redux';

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (data: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {data},
  };
};

const loginFailed = (error: any) => {
  return {
    type: LOGIN_FAILED,
    payload: error,
  };
};

export const loginDestroy = () => {
  return {
    type: LOGIN_DESTROY,
    payload: null,
  };
};

export const fetchLogin = (reqBody: any): any => {
  return async (dispatch: Dispatch<LOGIN_ACTION_TYPES>): Promise<void> => {
    dispatch(loginRequest());
    try {
      showLoading();
      const res = await api.post(URL_PATH.post_login, reqBody);
      if (res?.status === 200) {
        dispatch(loginSuccess(res?.data));
      } else {
        dispatch(loginFailed(res?.data));
      }
    } catch (err) {
      dispatch(loginFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
