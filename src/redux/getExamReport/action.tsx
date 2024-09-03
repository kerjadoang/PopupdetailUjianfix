import {
  EXAM_REQUEST,
  EXAM_SUCCESS,
  EXAM_FAILED,
  EXAM_DESTROY,
  EXAM_ACTION_TYPES,
} from './type';
import api from '@api';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const examRequest = () => {
  return {
    type: EXAM_REQUEST,
  };
};

const examSuccess = (data: any) => {
  return {
    type: EXAM_SUCCESS,
    payload: {data},
  };
};

const examFailed = (error: any) => {
  return {
    type: EXAM_FAILED,
    payload: error,
  };
};

export const examDestroy = () => {
  return {
    type: EXAM_DESTROY,
  };
};

export const fetchExam = (subject_id?: number, student_id?: number): any => {
  return async (dispatch: Dispatch<EXAM_ACTION_TYPES>): Promise<void> => {
    dispatch(examRequest());
    try {
      const res = await api.get(
        `${URL_PATH.get_report_exam}?subject=${subject_id}&studentId=${student_id}`,
      );
      if (res?.status === 200) {
        dispatch(examSuccess(res?.data));
      } else {
        dispatch(examFailed(res?.data));
      }
    } catch (err) {
      dispatch(examFailed(err));
    }
  };
};
