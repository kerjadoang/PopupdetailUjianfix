import {
  BLOG_REQUEST,
  BLOG_SUCCESS,
  BLOG_FAILED,
  BLOG_DESTROY,
  BLOG_ACTION_TYPES,
} from './type';
import {Keys} from '@constants/keys';
import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Storage} from '@constants/storage';
import {convertDate} from '@constants/functional';

const blogRequest = () => {
  return {
    type: BLOG_REQUEST,
  };
};

const blogSuccess = (data: any) => {
  return {
    type: BLOG_SUCCESS,
    payload: {data},
  };
};

const blogFailed = (error: any) => {
  return {
    type: BLOG_FAILED,
    payload: error,
  };
};

export const blogDestroy = () => {
  return {
    type: BLOG_DESTROY,
  };
};

export const fetchBlog = (tag: string) => {
  return async (dispatch: Dispatch<BLOG_ACTION_TYPES>): Promise<void> => {
    dispatch(blogRequest());
    try {
      const blogData = await Storage.getFromStorage({
        key: 'blogKeys',
      });

      if (blogData?.isExpired === false) {
        dispatch(blogSuccess(blogData.data));
        return;
      }

      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await api.get(
        `/blog/v1/info-pintar/?page=1&limit=20&tag=${tag == 0 ? '' : tag}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
            'Accept-Language': 'en',
          },
        },
      );
      if (res?.status === 200) {
        Storage.saveToStorage({
          data: res?.data,
          key: 'blogKeys',
          ttl: convertDate().add(12, 'hours'),
          removeWhenExpired: true,
        });
        dispatch(blogSuccess(res?.data));
      } else {
        dispatch(blogFailed(res?.data));
      }
    } catch (err) {
      dispatch(blogFailed(err));
    }
  };
};
