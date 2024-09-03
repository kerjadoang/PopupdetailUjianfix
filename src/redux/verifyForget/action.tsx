import api from '@api/index';
import {Dispatch} from 'redux';
import {
  VERIFY_FORGET_ACTION_TYPES,
  VERIFY_FORGET_DESTROY,
  VERIFY_FORGET_FAILED,
  VERIFY_FORGET_REQUEST,
  VERIFY_FORGET_SUCCESS,
} from './type';

const verifyForgetRequest = () => {
  return {
    type: VERIFY_FORGET_REQUEST,
  };
};

const verifyForgetSuccess = (data: any) => {
  return {
    type: VERIFY_FORGET_SUCCESS,
    payload: data,
  };
};

const verifyForgetFailed = (error: any) => {
  return {
    type: VERIFY_FORGET_FAILED,
    payload: error,
  };
};

export const verifyForgetDestroy = () => {
  return {
    type: VERIFY_FORGET_DESTROY,
    payload: null,
  };
};

export const fetchVerifyForget = (reqBody: any): any => {
  return async (
    dispatch: Dispatch<VERIFY_FORGET_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(verifyForgetRequest());
    try {
      const res = await api.post(
        '/uaa/v1/auth/forgot_password',
        {
          username: reqBody.username,
          password: reqBody.password,
        },
        {
          headers: {
            'Accept-Language': 'id',
          },
        },
      );
      if (res?.status === 200) {
        dispatch(verifyForgetSuccess(res?.data));
      } else {
        dispatch(verifyForgetFailed(res?.data));
      }
    } catch (err) {
      dispatch(verifyForgetFailed(err));
    }
  };
};
