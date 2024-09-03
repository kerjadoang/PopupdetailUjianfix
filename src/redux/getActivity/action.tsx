import {
  GET_ACTIVITY_DESTROY,
  GET_ACTIVITY_FAILED,
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import axios from 'axios';
import Config from 'react-native-config';

const getActivityRequest = () => {
  return {
    type: GET_ACTIVITY_REQUEST,
  };
};

const getActivitySuccess = (data: any) => {
  return {
    type: GET_ACTIVITY_SUCCESS,
    payload: data,
  };
};

const getActivityFailed = (error: any) => {
  return {
    type: GET_ACTIVITY_FAILED,
    payload: error,
  };
};

export const getActivityDestroy = () => {
  return {
    type: GET_ACTIVITY_DESTROY,
  };
};

export const fetchGetActivity: any = (limit: any, page?: any, token?: any) => {
  return async (
    dispatch: Dispatch<GET_ACTIVITY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getActivityRequest());
    try {
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');

      const url = `${Config.BASEURL}/notification/v1/aktivitas/`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token || tokenParse}`,
        },
      });

      if (res?.status === 200) {
        dispatch(getActivitySuccess(res?.data));
      } else {
        dispatch(getActivityFailed(res?.data));
      }
    } catch (err) {
      dispatch(getActivityFailed(err));
    }
  };
};
