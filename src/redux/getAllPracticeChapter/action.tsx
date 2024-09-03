import {
  GET_ALL_PRACTICE_CHAPTER_ACTION_TYPES,
  GET_ALL_PRACTICE_CHAPTER_DESTROY,
  GET_ALL_PRACTICE_CHAPTER_FAILED,
  GET_ALL_PRACTICE_CHAPTER_REQUEST,
  GET_ALL_PRACTICE_CHAPTER_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';

const getAllPracticeChapterRequest = () => {
  return {
    type: GET_ALL_PRACTICE_CHAPTER_REQUEST,
  };
};

const getAllPracticeChapterSuccess = (data: any) => {
  return {
    type: GET_ALL_PRACTICE_CHAPTER_SUCCESS,
    payload: data,
  };
};

const getAllPracticeChapterFailed = (error: any) => {
  return {
    type: GET_ALL_PRACTICE_CHAPTER_FAILED,
    payload: error,
  };
};

export const getAllPracticeChapterDestroy = () => {
  return {
    type: GET_ALL_PRACTICE_CHAPTER_DESTROY,
  };
};

export const fetchGetAllPracticeChapter = (
  chapter_id: string,
  callback?: any,
  errCallback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_ALL_PRACTICE_CHAPTER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllPracticeChapterRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(`lpt/v1/practice/go_practice/${chapter_id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
          'Device-id': '',
        },
      });

      if (res?.status === 200) {
        const data = res?.data || [];
        // using Promise.all() for fetch API paralel
        const promises = data?.data?.service?.map(async (obj: any) => {
          if (obj?.icon) {
            const imgRes = await api.get(`/media/v1/image/${obj?.icon_mobile}`);
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.icon_url = imgRes?.data?.data?.path_url;
              obj.icon_id = imgRes?.data?.data?.ID;
            }
          }
        });

        await Promise.all(promises);
        dispatch(getAllPracticeChapterSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getAllPracticeChapterFailed(res?.data));
      }
    } catch (err) {
      errCallback && errCallback(err);
      dispatch(getAllPracticeChapterFailed(err));
    }
  };
};
