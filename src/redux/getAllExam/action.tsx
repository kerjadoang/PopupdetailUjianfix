import {
  GET_ALL_EXAM_ACTION_TYPES,
  GET_ALL_EXAM_DESTROY,
  GET_ALL_EXAM_FAILED,
  GET_ALL_EXAM_REQUEST,
  GET_ALL_EXAM_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const getAllExamRequest: any = () => {
  return {
    type: GET_ALL_EXAM_REQUEST,
  };
};

const getAllExamSuccess: any = (data: any) => {
  return {
    type: GET_ALL_EXAM_SUCCESS,
    payload: data,
  };
};

const getAllExamFailed: any = (error: any) => {
  return {
    type: GET_ALL_EXAM_FAILED,
    payload: error,
  };
};

export const getAllExamDestroy: any = () => {
  return {
    type: GET_ALL_EXAM_DESTROY,
  };
};

export const fetchGetAllExam = (date: string): any => {
  return async (
    dispatch: Dispatch<GET_ALL_EXAM_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllExamRequest());
    try {
      showLoading();
      const res = await api.get(URL_PATH.get_schedule_exam_lms_home(date));
      if (res?.status === 200) {
        dispatch(getAllExamSuccess(res?.data));
      } else {
        dispatch(getAllExamFailed(res?.data));
      }
    } catch (err) {
      dispatch(getAllExamFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
