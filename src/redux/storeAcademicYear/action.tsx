import {
  POST_ACADEMIC_YEAR_ACTION_TYPES,
  POST_ACADEMIC_YEAR_DESTROY,
  POST_ACADEMIC_YEAR_FAILED,
  POST_ACADEMIC_YEAR_REQUEST,
  POST_ACADEMIC_YEAR_SUCCESS,
  _IPayloadAcademicYear,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const storeAcademicYearRequest = () => {
  return {
    type: POST_ACADEMIC_YEAR_REQUEST,
  };
};

const storeAcademicYearSuccess = (data: any) => {
  return {
    type: POST_ACADEMIC_YEAR_SUCCESS,
    payload: data,
  };
};

const storeAcademicYearFailed = (error: any) => {
  return {
    type: POST_ACADEMIC_YEAR_FAILED,
    payload: error,
  };
};

export const storeAcademicYearDestroy = () => {
  return {
    type: POST_ACADEMIC_YEAR_DESTROY,
  };
};

export const sendAcademicYear = (
  payload: _IPayloadAcademicYear,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<POST_ACADEMIC_YEAR_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(storeAcademicYearRequest());
    try {
      const res = await api.post(URL_PATH.store_academic_year, payload);
      if (res?.status === 200) {
        dispatch(storeAcademicYearSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(storeAcademicYearFailed(res?.data));
      }
    } catch (err) {
      dispatch(storeAcademicYearFailed(err));
    }
  };
};
