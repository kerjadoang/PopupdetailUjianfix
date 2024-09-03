import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILED,
  AUTHENTICATION_DESTROY,
  AUTHENTICATION_ACTION_TYPES,
} from './type';

import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const authenticationRequest = () => {
  return {
    type: AUTHENTICATION_REQUEST,
  };
};

const authenticationSuccess = (data: any) => {
  return {
    type: AUTHENTICATION_SUCCESS,
    payload: {data},
  };
};

const authenticationFailed = (error: any) => {
  return {
    type: AUTHENTICATION_FAILED,
    payload: error,
  };
};

export const authenticationDestroy = () => {
  return {
    type: AUTHENTICATION_DESTROY,
    payload: null,
  };
};

export const fetchAuthentication = (reqBody: any): any => {
  return async (
    dispatch: Dispatch<AUTHENTICATION_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(authenticationRequest());
    try {
      const res = await api.post(URL_PATH.post_check_username, {
        username: reqBody,
      });
      if (res?.status === 200) {
        dispatch(authenticationSuccess(res?.data));
      } else {
        dispatch(authenticationFailed(res?.data));
      }
    } catch (err) {
      dispatch(authenticationFailed(err));
    }
  };
};
