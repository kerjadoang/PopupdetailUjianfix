import {
  HISTORY_COIN_REQUEST,
  HISTORY_COIN_SUCCESS,
  HISTORY_COIN_FAILED,
  HISTORY_COIN_DESTROY,
  HISTORY_COIN_ACTION_TYPES,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiWithoutToken from '@api/withoutToken';

import {Dispatch} from 'redux';
import {Keys} from '@constants/keys';
import {URL_PATH} from '@constants/url';

const historyCoinRequest = () => {
  return {
    type: HISTORY_COIN_REQUEST,
  };
};

const historyCoinSuccess = (data: any) => {
  return {
    type: HISTORY_COIN_SUCCESS,
    payload: data,
  };
};

const historyCoinFailed = (error: any) => {
  return {
    type: HISTORY_COIN_FAILED,
    payload: error,
  };
};

export const historyCoinDestroy = () => {
  return {
    type: HISTORY_COIN_DESTROY,
  };
};

export const fetchHistoryCoin = (filter?: string, tokenAnak?: string): any => {
  return async (
    dispatch: Dispatch<HISTORY_COIN_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(historyCoinRequest());
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await apiWithoutToken.get(
        URL_PATH.get_purchase_coin_history(filter),
        {
          headers: {
            Authorization: `Bearer ${tokenAnak || tokenParse}`,
          },
        },
      );

      if (res?.status === 200) {
        dispatch(historyCoinSuccess(res?.data));
      } else {
        dispatch(historyCoinFailed(res?.data));
      }
    } catch (err) {
      dispatch(historyCoinFailed(err));
    }
  };
};
