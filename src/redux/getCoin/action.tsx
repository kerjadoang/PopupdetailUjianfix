import {
  COIN_REQUEST,
  COIN_SUCCESS,
  COIN_FAILED,
  COIN_DESTROY,
  COIN_ACTION_TYPES,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiWithoutToken from '@api/withoutToken';

import {Dispatch} from 'redux';
import {Keys} from '@constants/keys';
import {GenerateUUID} from '@constants/functional';

const coinRequest = () => {
  return {
    type: COIN_REQUEST,
  };
};

const coinSuccess = (data: any) => {
  return {
    type: COIN_SUCCESS,
    payload: data,
  };
};

const coinFailed = (error: any) => {
  return {
    type: COIN_FAILED,
    payload: error,
  };
};

export const coinDestroy = () => {
  return {
    type: COIN_DESTROY,
  };
};

export const fetchCoin = (token?: any) => {
  return async (dispatch: Dispatch<COIN_ACTION_TYPES>): Promise<void> => {
    dispatch(coinRequest());
    try {
      // will be replace if login success implements
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');
      const requestId = GenerateUUID();

      const res = await apiWithoutToken.get('/purchase/v1/coin/balance', {
        headers: {
          Authorization: `Bearer ${token || tokenParse}`,
          'Request-Id': requestId,
        },
      });
      if (res?.status === 200) {
        dispatch(coinSuccess(res?.data));
      } else {
        dispatch(coinFailed(res?.data));
      }
    } catch (err) {
      dispatch(coinFailed(err));
    }
  };
};
