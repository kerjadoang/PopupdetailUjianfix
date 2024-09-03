import {
  XP_REQUEST,
  XP_SUCCESS,
  XP_FAILED,
  XP_DESTROY,
  XP_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import axios from 'axios';
import {GenerateUUID} from '@constants/functional';
import Config from 'react-native-config';

const xpRequest = () => {
  return {
    type: XP_REQUEST,
  };
};

const xpSuccess = (data: any) => {
  return {
    type: XP_SUCCESS,
    payload: data,
  };
};

const xpFailed = (error: any) => {
  return {
    type: XP_FAILED,
    payload: error,
  };
};

export const xpDestroy = () => {
  return {
    type: XP_DESTROY,
  };
};

export const fetchXp = (token?: any) => {
  return async (dispatch: Dispatch<XP_ACTION_TYPES>): Promise<void> => {
    dispatch(xpRequest());
    try {
      // will be replace if login success implements
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');
      const requestId = GenerateUUID();
      const res = await axios.get(`${Config.BASEURL}/uaa/v1/user/get-user-xp`, {
        headers: {
          Authorization: `Bearer ${token || tokenParse}`,
          'Request-Id': requestId,
        },
      });

      if (res?.status === 200) {
        dispatch(xpSuccess(res?.data));
      } else {
        dispatch(xpFailed(res?.data));
      }
    } catch (err) {
      dispatch(xpFailed(err));
    }
  };
};
