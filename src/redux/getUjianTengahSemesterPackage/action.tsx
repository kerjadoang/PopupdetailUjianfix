import {
  GET_UJIAN_TENGAH_SEMESTER_PACKAGE_ACTION_TYPES,
  GET_UJIAN_TENGAH_SEMESTER_PACKAGE_DESTROY,
  GET_UJIAN_TENGAH_SEMESTER_PACKAGE_FAILED,
  GET_UJIAN_TENGAH_SEMESTER_PACKAGE_REQUEST,
  GET_UJIAN_TENGAH_SEMESTER_PACKAGE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getUjianTengahSemesterRequest = () => {
  return {
    type: GET_UJIAN_TENGAH_SEMESTER_PACKAGE_REQUEST,
  };
};

const getUjianTengahSemesterSuccess = (data: any) => {
  return {
    type: GET_UJIAN_TENGAH_SEMESTER_PACKAGE_SUCCESS,
    payload: data,
  };
};

const getUjianTengahSemesterFailed = (error: any) => {
  return {
    type: GET_UJIAN_TENGAH_SEMESTER_PACKAGE_FAILED,
    payload: error,
  };
};

export const getUjianTengahSemesterDestroy = () => {
  return {
    type: GET_UJIAN_TENGAH_SEMESTER_PACKAGE_DESTROY,
  };
};

export const fetchGetUjianTengahSemester = (
  subject_id: number,
  callback?: any,
  errCallback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_UJIAN_TENGAH_SEMESTER_PACKAGE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getUjianTengahSemesterRequest());
    try {
      const res = await api.get(
        URL_PATH.get_ujian_tengah_semester_package(subject_id),
      );

      if (res?.status === 200) {
        dispatch(getUjianTengahSemesterSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getUjianTengahSemesterFailed(res?.data));
      }
    } catch (err) {
      errCallback && errCallback(err);
      dispatch(getUjianTengahSemesterFailed(err));
    }
  };
};
