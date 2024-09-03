import {
  GET_ALL_TEST_CHAPTER_ACTION_TYPES,
  GET_ALL_TEST_CHAPTER_DESTROY,
  GET_ALL_TEST_CHAPTER_FAILED,
  GET_ALL_TEST_CHAPTER_REQUEST,
  GET_ALL_TEST_CHAPTER_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getAllTestChapterRequest = () => {
  return {
    type: GET_ALL_TEST_CHAPTER_REQUEST,
  };
};

const getAllTestChapterSuccess = (data: any) => {
  return {
    type: GET_ALL_TEST_CHAPTER_SUCCESS,
    payload: data,
  };
};

const getAllTestChapterFailed = (error: any) => {
  return {
    type: GET_ALL_TEST_CHAPTER_FAILED,
    payload: error,
  };
};

export const getAllTestChapterDestroy = () => {
  return {
    type: GET_ALL_TEST_CHAPTER_DESTROY,
  };
};

export const fetchGetAllTestChapter = (
  chapter_id: string,
  callback?: any,
  errCallback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_ALL_TEST_CHAPTER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllTestChapterRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(URL_PATH.get_all_chapter_test(chapter_id), {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
          'Device-id': '',
        },
      });

      if (res?.status === 200) {
        dispatch(getAllTestChapterSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getAllTestChapterFailed(res?.data));
      }
    } catch (err) {
      errCallback && errCallback(err);
      dispatch(getAllTestChapterFailed(err));
    }
  };
};
