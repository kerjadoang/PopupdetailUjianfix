import {
  STUDENT_DETAIL_REQUEST,
  STUDENT_DETAIL_SUCCESS,
  STUDENT_DETAIL_FAILED,
  STUDENT_DETAIL_DESTROY,
  STUDENT_DETAIL_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const studentDetailRequest = () => {
  return {
    type: STUDENT_DETAIL_REQUEST,
  };
};

const studentDetailSuccess = (data: any) => {
  return {
    type: STUDENT_DETAIL_SUCCESS,
    payload: {data},
  };
};

const studentDetailFailed = (error: any) => {
  return {
    type: STUDENT_DETAIL_FAILED,
    payload: error,
  };
};

export const studentDetailDestroy = () => {
  return {
    type: STUDENT_DETAIL_DESTROY,
  };
};

export const fetchStudentDetail = (student_id: number) => {
  return async (
    dispatch: Dispatch<STUDENT_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(studentDetailRequest());
    try {
      const res = await api.get(URL_PATH.get_student_detail(student_id));

      if (res?.status === 200) {
        const imgRes = await api.get(
          `/media/v1/image/${res?.data?.data?.avatar}`,
        );
        if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
          res.data.data.path_url = imgRes?.data?.data?.path_url;
        }
        dispatch(studentDetailSuccess(res?.data));
      } else {
        dispatch(studentDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(studentDetailFailed(err));
    }
  };
};
