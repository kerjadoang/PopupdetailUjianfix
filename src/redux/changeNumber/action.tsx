import api from '@api';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CHANGE_NUMBER_ACTION_TYPES,
  CHANGE_NUMBER_DESTROY,
  CHANGE_NUMBER_FAILED,
  CHANGE_NUMBER_REQUEST,
  CHANGE_NUMBER_SUCCESS,
} from './type';
import {Keys} from '@constants/keys';
const changeNumberRequest = () => {
  return {
    type: CHANGE_NUMBER_REQUEST,
  };
};

const changeNumberSuccess = (data: any) => {
  return {
    type: CHANGE_NUMBER_SUCCESS,
    payload: data,
  };
};

const changeNumberFailed = (error: any) => {
  return {
    type: CHANGE_NUMBER_FAILED,
    payload: error,
  };
};

export const changeNumberDestroy = () => {
  return {
    type: CHANGE_NUMBER_DESTROY,
    payload: null,
  };
};

export const fetchChangeNumber = (reqBody: any): any => {
  return async (
    dispatch: Dispatch<CHANGE_NUMBER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(changeNumberRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);

      const tokenParse = await JSON.parse(token || '');
      const res = await api.put(
        '/uaa/v1/user/change_phone_number',
        {
          new_phone_number: reqBody.new_phone_number,
          otp: reqBody.otp,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
            'Accept-Language': 'id',
          },
        },
      );
      if (res?.status === 200) {
        dispatch(changeNumberSuccess(res?.data));
      } else {
        dispatch(changeNumberFailed(res?.data));
      }
    } catch (err) {
      dispatch(changeNumberFailed(err));
    }
  };
};
