import {
  GET_TEACHER_CHAPTER_ACTION_TYPES,
  GET_TEACHER_CHAPTER_DESTROY,
  GET_TEACHER_CHAPTER_FAILED,
  GET_TEACHER_CHAPTER_REQUEST,
  GET_TEACHER_CHAPTER_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getTeacherChapterRequest = () => {
  return {
    type: GET_TEACHER_CHAPTER_REQUEST,
  };
};

const getTeacherChapterSuccess = (data: any) => {
  return {
    type: GET_TEACHER_CHAPTER_SUCCESS,
    payload: data,
  };
};

const getTeacherChapterFailed = (error: any) => {
  return {
    type: GET_TEACHER_CHAPTER_FAILED,
    payload: error,
  };
};

export const getTeacherChapterDestroy = () => {
  return {
    type: GET_TEACHER_CHAPTER_DESTROY,
  };
};

export const fetchTeacherChapter = (id: number): any => {
  return async (
    dispatch: Dispatch<GET_TEACHER_CHAPTER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getTeacherChapterRequest());
    try {
      const res = await api.get(URL_PATH.get_teacher_chapter(id));
      if (res?.status === 200) {
        dispatch(getTeacherChapterSuccess(res?.data));
      } else {
        dispatch(getTeacherChapterFailed(res?.data));
      }
    } catch (err) {
      dispatch(getTeacherChapterFailed(err));
    }
  };
};
