import {
  ASK_REQUEST,
  ASK_SUCCESS,
  ASK_FAILED,
  ASK_DESTROY,
  ASK_ACTION_TYPES,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';

import {Dispatch} from 'redux';
import {Keys} from '@constants/keys';

const askRequest = () => {
  return {
    type: ASK_REQUEST,
  };
};

const askSuccess = (data: any) => {
  return {
    type: ASK_SUCCESS,
    payload: data,
  };
};

const askFailed = (error: any) => {
  return {
    type: ASK_FAILED,
    payload: error,
  };
};

export const askDestroy = () => {
  return {
    type: ASK_DESTROY,
  };
};

export const fetchAsk = (): any => {
  return async (dispatch: Dispatch<ASK_ACTION_TYPES>): Promise<void> => {
    dispatch(askRequest());
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get('/tanya/v1/home', {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        dispatch(askSuccess(res?.data));
      } else {
        dispatch(askFailed(res?.data));
      }
    } catch (err) {
      dispatch(askFailed(err));
    }
  };
};
