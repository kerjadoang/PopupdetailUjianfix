import {
  GET_ULANGAN_HARIAN_CHAPTER_ACTION_TYPES,
  GET_ULANGAN_HARIAN_CHAPTER_DESTROY,
  GET_ULANGAN_HARIAN_CHAPTER_FAILED,
  GET_ULANGAN_HARIAN_CHAPTER_REQUEST,
  GET_ULANGAN_HARIAN_CHAPTER_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getUlanganHarianChapterRequest = () => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_REQUEST,
  };
};

const getUlanganHarianChapterSuccess = (data: any) => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_SUCCESS,
    payload: data,
  };
};

const getUlanganHarianChapterFailed = (error: any) => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_FAILED,
    payload: error,
  };
};

export const getUlanganHarianChapterDestroy = () => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_DESTROY,
  };
};

export const fetchGetUlanganHarianChapter = (
  subject_id: number,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_ULANGAN_HARIAN_CHAPTER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getUlanganHarianChapterRequest());
    try {
      const res = await api.get(
        URL_PATH.get_ulangan_harian_chapter(subject_id),
      );
      if (res?.status === 200) {
        dispatch(getUlanganHarianChapterSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getUlanganHarianChapterFailed(res?.data));
      }
    } catch (err) {
      dispatch(getUlanganHarianChapterFailed(err));
    }
  };
};
