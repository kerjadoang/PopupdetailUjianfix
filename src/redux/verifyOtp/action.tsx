import api from '@api/index';
import {Dispatch} from 'redux';
import {
  VERIFY_OTP_ACTION_TYPES,
  VERIFY_OTP_DESTROY,
  VERIFY_OTP_FAILED,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from './type';

const verifyOtpRequest = () => {
  return {
    type: VERIFY_OTP_REQUEST,
  };
};

const verifyOtpSuccess = (data: any) => {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload: data,
  };
};

const verifyOtpFailed = (error: any) => {
  return {
    type: VERIFY_OTP_FAILED,
    payload: error,
  };
};

export const verifyOtpDestroy = () => {
  return {
    type: VERIFY_OTP_DESTROY,
  };
};

export const fetchVerifyOtp = (reqBody: any): any => {
  return async (dispatch: Dispatch<VERIFY_OTP_ACTION_TYPES>): Promise<void> => {
    dispatch(verifyOtpRequest());
    try {
      const res = await api.post('/uaa/v1/auth/register', reqBody, {
        headers: {
          'Content-Type': 'application/json',
          'access-control-allow-origin': '*',
          'Accept-Language': 'id',
        },
      });

      if (res?.status === 200) {
        dispatch(verifyOtpSuccess(res?.data));
      } else {
        dispatch(verifyOtpFailed(res?.data));
      }
    } catch (err) {
      dispatch(verifyOtpFailed(err));
    }
  };
};
