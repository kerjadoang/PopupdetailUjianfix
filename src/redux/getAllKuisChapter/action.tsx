import {
  GET_ALL_KUIS_CHAPTER_ACTION_TYPES,
  GET_ALL_KUIS_CHAPTER_DESTROY,
  GET_ALL_KUIS_CHAPTER_FAILED,
  GET_ALL_KUIS_CHAPTER_REQUEST,
  GET_ALL_KUIS_CHAPTER_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getAllKuisChapterRequest = () => {
  return {
    type: GET_ALL_KUIS_CHAPTER_REQUEST,
  };
};

const getAllKuisChapterSuccess = (data: any) => {
  return {
    type: GET_ALL_KUIS_CHAPTER_SUCCESS,
    payload: data,
  };
};

const getAllKuisChapterFailed = (error: any) => {
  return {
    type: GET_ALL_KUIS_CHAPTER_FAILED,
    payload: error,
  };
};

export const getAllKuisChapterDestroy = () => {
  return {
    type: GET_ALL_KUIS_CHAPTER_DESTROY,
  };
};

export const fetchGetAllKuisChapter = (
  subject_id: string,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_ALL_KUIS_CHAPTER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllKuisChapterRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(URL_PATH.get_all_kuis_chapter(subject_id), {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
          'Device-id': '',
        },
      });
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(getAllKuisChapterSuccess(res?.data));
      } else {
        dispatch(getAllKuisChapterFailed(res?.data));
      }
    } catch (err) {
      dispatch(getAllKuisChapterFailed(err));
    }
  };
};
