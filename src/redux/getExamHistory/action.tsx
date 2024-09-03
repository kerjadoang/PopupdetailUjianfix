import {
  GET_EXAM_HISTORY_ACTION_TYPES,
  GET_EXAM_HISTORY_DESTROY,
  GET_EXAM_HISTORY_FAILED,
  GET_EXAM_HISTORY_REQUEST,
  GET_EXAM_HISTORY_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getExamHistoryRequest = () => {
  return {
    type: GET_EXAM_HISTORY_REQUEST,
  };
};

const getExamHistorySuccess = (data: any, nextPage: boolean, params: any) => {
  return {
    type: GET_EXAM_HISTORY_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getExamHistoryFailed = (error: any, nextPage?: boolean, params?: any) => {
  return {
    type: GET_EXAM_HISTORY_FAILED,
    payload: {
      error,
      nextPage,
      params,
    },
  };
};

export const getExamHistoryDestroy = () => {
  return {
    type: GET_EXAM_HISTORY_DESTROY,
  };
};

export const fetchGetTeacherExamHistory = (
  body: any,
  params: any,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_EXAM_HISTORY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getExamHistoryRequest());
    let nextPage = false;
    try {
      const res = await api.post(URL_PATH.get_teacher_exam_history, body, {
        params: params,
      });
      if (res?.status === 200) {
        callback && callback(res);
        dispatch(getExamHistorySuccess(res?.data, nextPage, body));
      } else {
        nextPage = res.data?.data?.length > 0 ? true : false;
        callback && callback(res);
        dispatch(getExamHistoryFailed(res?.data, nextPage, body));
      }
    } catch (err) {
      callback && callback(err);
      dispatch(getExamHistoryFailed(err, nextPage, body));
    }
  };
};
