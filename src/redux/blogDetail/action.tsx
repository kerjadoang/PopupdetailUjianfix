import {
  BLOGD_REQUEST,
  BLOGD_SUCCESS,
  BLOGD_FAILED,
  BLOGD_DESTROY,
  BLOGD_ACTION_TYPES,
} from './type';

import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';

const blogdRequest = () => {
  return {
    type: BLOGD_REQUEST,
  };
};

const blogdSuccess = (data: any) => {
  return {
    type: BLOGD_SUCCESS,
    payload: data,
  };
};

const blogdFailed = (error: any) => {
  return {
    type: BLOGD_FAILED,
    payload: error,
  };
};

export const blogdDestroy = () => {
  return {
    type: BLOGD_DESTROY,
  };
};

export const fetchBlogD = (id: number) => {
  return async (dispatch: Dispatch<BLOGD_ACTION_TYPES>): Promise<void> => {
    dispatch(blogdRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(`/blog/v1/info-pintar/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });

      if (res?.status === 200) {
        dispatch(blogdSuccess(res?.data));
      } else {
        dispatch(blogdFailed(res?.data));
      }
    } catch (err) {
      dispatch(blogdFailed(err));
    }
  };
};
