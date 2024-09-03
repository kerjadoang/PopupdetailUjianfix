import {
  GET_ALL_CHAPTER_DESTROY,
  GET_ALL_CHAPTER_FAILED,
  GET_ALL_CHAPTER_REQUEST,
  GET_ALL_CHAPTER_SUCCESS,
  GET_ALL_CHAPTER_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getAllChapterRequest = () => {
  return {
    type: GET_ALL_CHAPTER_REQUEST,
  };
};

const getAllChapterSuccess = (data: any) => {
  return {
    type: GET_ALL_CHAPTER_SUCCESS,
    payload: data,
  };
};

const getAllChapterFailed = (error: any) => {
  return {
    type: GET_ALL_CHAPTER_FAILED,
    payload: error,
  };
};

export const getAllChapterDestroy = () => {
  return {
    type: GET_ALL_CHAPTER_DESTROY,
  };
};

export const fetchGetAllChapter = (
  chapter_id: string,
  callback?: any,
  errCallback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_ALL_CHAPTER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllChapterRequest());
    try {
      const res = await api.get(URL_PATH.get_all_chapter_lesson(chapter_id));
      if (res?.status === 200) {
        dispatch(getAllChapterSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getAllChapterFailed(res?.data));
      }
    } catch (err) {
      errCallback && errCallback(err);
      dispatch(getAllChapterFailed(err));
    }
  };
};
