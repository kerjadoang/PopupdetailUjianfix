import api from '@api';
import {Dispatch} from 'redux';
import {
  FORGET_OTP_ACTION_TYPES,
  FORGET_OTP_DESTROY,
  FORGET_OTP_FAILED,
  FORGET_OTP_REQUEST,
  FORGET_OTP_SUCCESS,
} from './type';

const forgetOtpRequest = () => {
  return {
    type: FORGET_OTP_REQUEST,
  };
};

const forgetOtpSuccess = (data: any) => {
  return {
    type: FORGET_OTP_SUCCESS,
    payload: data,
  };
};

const forgetOtpFailed = (error: any) => {
  return {
    type: FORGET_OTP_FAILED,
    payload: error,
  };
};

export const forgetOtpDestroy = () => {
  return {
    type: FORGET_OTP_DESTROY,
    payload: null,
  };
};

export const fetchForgetOtp = (reqBody: any): any => {
  return async (dispatch: Dispatch<FORGET_OTP_ACTION_TYPES>): Promise<void> => {
    dispatch(forgetOtpRequest());
    try {
      const res = await api.post(
        '/uaa/v1/auth/verify_otp_forgot_password',
        reqBody,
      );

      if (res?.status === 200) {
        dispatch(forgetOtpSuccess(res?.data));
      } else {
        dispatch(forgetOtpFailed(res?.data));
      }
    } catch (err) {
      dispatch(forgetOtpFailed(err));
    }
  };
};
