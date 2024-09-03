import api from '@api';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CHANGE_NUMBER_OTP_ACTION_TYPES,
  CHANGE_NUMBER_OTP_DESTROY,
  CHANGE_NUMBER_OTP_FAILED,
  CHANGE_NUMBER_OTP_REQUEST,
  CHANGE_NUMBER_OTP_SUCCESS,
} from './type';
import {Keys} from '@constants/keys';
const changeNumberOTPRequest = () => {
  return {
    type: CHANGE_NUMBER_OTP_REQUEST,
  };
};

const changeNumberOTPSuccess = (data: any) => {
  return {
    type: CHANGE_NUMBER_OTP_SUCCESS,
    payload: data,
  };
};

const changeNumberOTPFailed = (error: any) => {
  return {
    type: CHANGE_NUMBER_OTP_FAILED,
    payload: error,
  };
};

export const changeNumberOTPDestroy = () => {
  return {
    type: CHANGE_NUMBER_OTP_DESTROY,
    payload: null,
  };
};

export const fetchChangeNumberOTP = (reqBody: any): any => {
  return async (
    dispatch: Dispatch<CHANGE_NUMBER_OTP_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(changeNumberOTPRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);

      const tokenParse = await JSON.parse(token || '');
      const res = await api.post(
        '/uaa/v1/user/request_otp_change_phone_number',
        {
          phone_number: `+${reqBody}`,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
            'Accept-Language': 'id',
          },
        },
      );
      if (res?.status === 200) {
        dispatch(changeNumberOTPSuccess(res));
      } else {
        dispatch(changeNumberOTPFailed(res?.data));
      }
    } catch (err) {
      dispatch(changeNumberOTPFailed(err));
    }
  };
};
