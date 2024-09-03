import {
  GET_ALL_PRACTICE_CHAPTER_QUESTION_ACTION_TYPES,
  GET_ALL_PRACTICE_CHAPTER_QUESTION_DESTROY,
  GET_ALL_PRACTICE_CHAPTER_QUESTION_FAILED,
  GET_ALL_PRACTICE_CHAPTER_QUESTION_REQUEST,
  GET_ALL_PRACTICE_CHAPTER_QUESTION_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getAllPracticeChapterQuestionRequest = () => {
  return {
    type: GET_ALL_PRACTICE_CHAPTER_QUESTION_REQUEST,
  };
};

const getAllPracticeChapterQuestionSuccess = (data: any) => {
  return {
    type: GET_ALL_PRACTICE_CHAPTER_QUESTION_SUCCESS,
    payload: data,
  };
};

const getAllPracticeChapterQuestionFailed = (error: any) => {
  return {
    type: GET_ALL_PRACTICE_CHAPTER_QUESTION_FAILED,
    payload: error,
  };
};

export const getAllPracticeChapterQuestionDestroy = () => {
  return {
    type: GET_ALL_PRACTICE_CHAPTER_QUESTION_DESTROY,
  };
};

export const fetchGetAllPracticeChapterQuestion = (
  chapter_id: string,
  question_service_type_id: string,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_ALL_PRACTICE_CHAPTER_QUESTION_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllPracticeChapterQuestionRequest());
    try {
      const res = await api.get(
        URL_PATH.get_all_practice_chapter_question(
          chapter_id,
          question_service_type_id,
        ),
      );

      if (res?.status === 200) {
        dispatch(getAllPracticeChapterQuestionSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getAllPracticeChapterQuestionFailed(res?.data));
      }
    } catch (err) {
      dispatch(getAllPracticeChapterQuestionFailed(err));
    }
  };
};
