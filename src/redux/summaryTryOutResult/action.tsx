import {
  SUMMARY_TRYOUT_REQUEST,
  SUMMARY_TRYOUT_SUCCESS,
  SUMMARY_TRYOUT_FAILED,
  SUMMARY_TRYOUT_DESTROY,
  SUMMARY_TRYOUT_ACTION_TYPES,
} from './type';
import {Keys} from '@constants/keys';
import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_PATH} from '@constants/url';

const summaryTryoutRequest = () => {
  return {
    type: SUMMARY_TRYOUT_REQUEST,
  };
};

const summaryTryoutSuccess = (data: any) => {
  return {
    type: SUMMARY_TRYOUT_SUCCESS,
    payload: {data},
  };
};

const summaryTryoutFailed = (error: any) => {
  return {
    type: SUMMARY_TRYOUT_FAILED,
    payload: error,
  };
};

export const summaryTryoutDestroy = () => {
  return {
    type: SUMMARY_TRYOUT_DESTROY,
  };
};

export const fetchsummaryTryout = () => {
  return async (
    dispatch: Dispatch<SUMMARY_TRYOUT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(summaryTryoutRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await api.get(`${URL_PATH.get_summary_tryout}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        dispatch(summaryTryoutSuccess(res?.data));
      } else {
        dispatch(summaryTryoutFailed(res?.data));
      }
    } catch (err) {
      dispatch(summaryTryoutFailed(err));
    }
  };
};
