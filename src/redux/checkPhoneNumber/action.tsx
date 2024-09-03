import api from '@api';
import {Dispatch} from 'redux';
import {
  CHECK_PHONE_NUMBER_ACTION_TYPES,
  CHECK_PHONE_NUMBER_DESTROY,
  CHECK_PHONE_NUMBER_FAILED,
  CHECK_PHONE_NUMBER_REQUEST,
  CHECK_PHONE_NUMBER_SUCCESS,
} from './type';

const checkPhoneNumberRequest = () => {
  return {
    type: CHECK_PHONE_NUMBER_REQUEST,
  };
};

const checkPhoneNumberSuccess = (data: any) => {
  return {
    type: CHECK_PHONE_NUMBER_SUCCESS,
    payload: data,
  };
};

const checkPhoneNumberFailed = (error: any) => {
  return {
    type: CHECK_PHONE_NUMBER_FAILED,
    payload: error,
  };
};

export const checkPhoneNumberDestroy = () => {
  return {
    type: CHECK_PHONE_NUMBER_DESTROY,
  };
};

export const fetchCheckPhoneNumber = (reqBody: any): any => {
  return async (
    dispatch: Dispatch<CHECK_PHONE_NUMBER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(checkPhoneNumberRequest());
    try {
      // will be replace if login success implements
      const res = await api.post('/uaa/v1/auth/check/phone_number', reqBody);
      if (res?.status === 200) {
        dispatch(checkPhoneNumberSuccess(res?.data));
      } else {
        dispatch(checkPhoneNumberFailed(res?.data));
      }
    } catch (err) {
      dispatch(checkPhoneNumberFailed(err));
    }
  };
};
