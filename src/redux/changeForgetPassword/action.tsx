import {
  CHANGE_FORGET_PASSWORD_REQUEST,
  CHANGE_FORGET_PASSWORD_SUCCESS,
  CHANGE_FORGET_PASSWORD_FAILED,
  CHANGE_FORGET_PASSWORD_DESTROY,
  CHANGE_FORGET_PASSWORD_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';

const changeForgetPasswordRequest = () => {
  return {
    type: CHANGE_FORGET_PASSWORD_REQUEST,
  };
};

const changeForgetPasswordSuccess = (data: any) => {
  return {
    type: CHANGE_FORGET_PASSWORD_SUCCESS,
    payload: {data},
  };
};

const changeForgetPasswordFailed = (error: any) => {
  return {
    type: CHANGE_FORGET_PASSWORD_FAILED,
    payload: error,
  };
};

export const changeForgetPasswordDestroy = () => {
  return {
    type: CHANGE_FORGET_PASSWORD_DESTROY,
    payload: null,
  };
};

export const fetchChangeForgetPassword = (reqBody: any): any => {
  return async (
    dispatch: Dispatch<CHANGE_FORGET_PASSWORD_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(changeForgetPasswordRequest());
    try {
      const res = await api.post('/uaa/v1/auth/forgot_password', reqBody, {
        headers: {
          'Accept-Language': 'id',
        },
      });

      if (res?.status === 200) {
        dispatch(changeForgetPasswordSuccess(res?.data));
      } else {
        dispatch(changeForgetPasswordFailed(res?.data));
      }
    } catch (err) {
      dispatch(changeForgetPasswordFailed(err));
    }
  };
};
