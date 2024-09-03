import {
  CHANGE_PASSWORD_OTP_REQUEST,
  CHANGE_PASSWORD_OTP_SUCCESS,
  CHANGE_PASSWORD_OTP_FAILED,
  CHANGE_PASSWORD_OTP_DESTROY,
  CHANGE_PASSWORD_OTP_ACTION_TYPES,
} from './type';

import api from '@api';

import {Dispatch} from 'redux';

const changePasswordOTPRequest = () => {
  return {
    type: CHANGE_PASSWORD_OTP_REQUEST,
  };
};

const changePasswordOTPSuccess = (data: any) => {
  return {
    type: CHANGE_PASSWORD_OTP_SUCCESS,
    payload: {data},
  };
};

const changePasswordOTPFailed = (error: any) => {
  return {
    type: CHANGE_PASSWORD_OTP_FAILED,
    payload: error,
  };
};

export const changePasswordOTPDestroy = () => {
  return {
    type: CHANGE_PASSWORD_OTP_DESTROY,
    payload: null,
  };
};

export const fetchChangePasswordOTP = (
  reqBody: any,
  callback?: CallBackWithParams<void, any>,
  errCallback?: CallBackWithParams<void, any>,
): any => {
  return async (
    dispatch: Dispatch<CHANGE_PASSWORD_OTP_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(changePasswordOTPRequest());
    try {
      const res = await api.post('/uaa/v1/auth/request_otp_forgot_password', {
        username: reqBody,
      });
      if (res?.status === 200) {
        dispatch(changePasswordOTPSuccess(res?.data));
        callback && callback(res?.data);
      } else {
        errCallback && errCallback(res?.data);
        dispatch(changePasswordOTPFailed(res?.data));
      }
    } catch (err) {
      errCallback && errCallback(err);
      dispatch(changePasswordOTPFailed(err));
    }
  };
};
