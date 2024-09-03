import api from '@api/index';
import {Dispatch} from 'redux';
import {
  RESEND_VERIFY_OTP_ACTION_TYPES,
  RESEND_VERIFY_OTP_DESTROY,
  RESEND_VERIFY_OTP_FAILED,
  RESEND_VERIFY_OTP_REQUEST,
  RESEND_VERIFY_OTP_SUCCESS,
} from './type';

const resendVerifyOtpRequest = () => {
  return {
    type: RESEND_VERIFY_OTP_REQUEST,
  };
};

const resendVerifyOtpSuccess = (data: any) => {
  return {
    type: RESEND_VERIFY_OTP_SUCCESS,
    payload: data,
  };
};

const resendVerifyOtpFailed = (error: any) => {
  return {
    type: RESEND_VERIFY_OTP_FAILED,
    payload: error,
  };
};

export const resendVerifyOtpDestroy = () => {
  return {
    type: RESEND_VERIFY_OTP_DESTROY,
  };
};

export const fetchResendVerifyOtp = (reqBody: any): any => {
  return async (
    dispatch: Dispatch<RESEND_VERIFY_OTP_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(resendVerifyOtpRequest());
    try {
      const res = await api.post('/uaa/v1/auth/resend_otp', reqBody, {
        headers: {
          'Content-Type': 'application/json',
          'access-control-allow-origin': '*',
          'Accept-Language': 'id',
        },
      });

      if (res?.status === 200) {
        dispatch(resendVerifyOtpSuccess(res?.data));
      } else {
        dispatch(resendVerifyOtpFailed(res?.data));
      }
    } catch (err) {
      dispatch(resendVerifyOtpFailed(err));
    }
  };
};
