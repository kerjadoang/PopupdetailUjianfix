import {
  TAGS_REQUEST,
  TAGS_SUCCESS,
  TAGS_FAILED,
  TAGS_DESTROY,
  TAGS_ACTION_TYPES,
} from './type';

import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';

const tagsRequest = () => {
  return {
    type: TAGS_REQUEST,
  };
};

const tagsSuccess = (data: any) => {
  return {
    type: TAGS_SUCCESS,
    payload: {data},
  };
};

const tagsFailed = (error: any) => {
  return {
    type: TAGS_FAILED,
    payload: error,
  };
};

export const tagsDestroy = () => {
  return {
    type: TAGS_DESTROY,
  };
};

export const fetchTags = () => {
  return async (dispatch: Dispatch<TAGS_ACTION_TYPES>): Promise<void> => {
    dispatch(tagsRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get('/blog/v1/info-pintar/tags/?page=1&limit=10', {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        dispatch(tagsSuccess(res?.data));
      } else {
        dispatch(tagsFailed(res?.data));
      }
    } catch (err) {
      dispatch(tagsFailed(err));
    }
  };
};
