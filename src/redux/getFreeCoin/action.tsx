import {
  FRCOIN_REQUEST,
  FRCOIN_SUCCESS,
  FRCOIN_FAILED,
  FRCOIN_DESTROY,
  FRCOIN_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import {fetchCoin} from '../getCoin/action';
import {fetchGetUser} from '../getUser/action';
import {dismissLoading, showLoading} from '@constants/functional';

const freeCoinRequest = () => {
  return {
    type: FRCOIN_REQUEST,
  };
};

const freeCoinSuccess = (data: any) => {
  return {
    type: FRCOIN_SUCCESS,
    payload: {data},
  };
};

const freeCoinFailed = (error: any) => {
  return {
    type: FRCOIN_FAILED,
    payload: error,
  };
};

export const freeCoinDestroy = () => {
  return {
    type: FRCOIN_DESTROY,
  };
};

export const fetchFreeCoin = (callback?: CallBackWithParams<void, any>) => {
  return async (dispatch: Dispatch<FRCOIN_ACTION_TYPES>): Promise<void> => {
    dispatch(freeCoinRequest());
    try {
      showLoading();

      const res = await api.put(URL_PATH.get_free_coin);
      if (res?.status === 200) {
        dispatch(freeCoinSuccess(res?.data));
        dispatch(fetchCoin());
        callback && callback(res);
        dispatch(fetchGetUser());
      } else {
        dispatch(freeCoinFailed(res?.data));
      }
    } catch (err) {
      dispatch(freeCoinFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
