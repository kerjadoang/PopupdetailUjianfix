import {
  ACADEMIC_YEAR_REQUEST,
  ACADEMIC_YEAR_SUCCESS,
  ACADEMIC_YEAR_FAILED,
  ACADEMIC_YEAR_DESTROY,
  ACADEMIC_YEAR_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const AcademicYearRequest = () => {
  return {
    type: ACADEMIC_YEAR_REQUEST,
  };
};

const AcademicYearSuccess = (data: any) => {
  return {
    type: ACADEMIC_YEAR_SUCCESS,
    payload: {data},
  };
};

const AcademicYearFailed = (error: any) => {
  return {
    type: ACADEMIC_YEAR_FAILED,
    payload: error,
  };
};

export const AcademicYearDestroy = () => {
  return {
    type: ACADEMIC_YEAR_DESTROY,
  };
};

export const fetchAcademicYear = (id: number) => {
  return async (
    dispatch: Dispatch<ACADEMIC_YEAR_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(AcademicYearRequest());
    try {
      const res = await api.get(URL_PATH.get_academic_year(id));
      if (res?.status === 200) {
        dispatch(AcademicYearSuccess(res?.data));
      } else {
        dispatch(AcademicYearFailed(res?.data));
      }
    } catch (err) {
      dispatch(AcademicYearFailed(err));
    }
  };
};
