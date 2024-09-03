import {
  ACADEMIC_YEAR_ONGOING_REQUEST,
  ACADEMIC_YEAR_ONGOING_SUCCESS,
  ACADEMIC_YEAR_ONGOING_FAILED,
  ACADEMIC_YEAR_ONGOING_DESTROY,
  ACADEMIC_YEAR_ONGOING_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const AcademicYearOngoingRequest = () => {
  return {
    type: ACADEMIC_YEAR_ONGOING_REQUEST,
  };
};

const AcademicYearOngoingSuccess = (data: any) => {
  return {
    type: ACADEMIC_YEAR_ONGOING_SUCCESS,
    payload: {data},
  };
};

const AcademicYearOngoingFailed = (error: any) => {
  return {
    type: ACADEMIC_YEAR_ONGOING_FAILED,
    payload: error,
  };
};

export const AcademicYearOngoingDestroy = () => {
  return {
    type: ACADEMIC_YEAR_ONGOING_DESTROY,
  };
};

export const fetchAcademicYearOngoing = (id: number) => {
  return async (
    dispatch: Dispatch<ACADEMIC_YEAR_ONGOING_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(AcademicYearOngoingRequest());
    try {
      const res = await api.get(URL_PATH.get_ongoing_administrative_report(id));
      if (res?.status === 200) {
        dispatch(AcademicYearOngoingSuccess(res?.data));
      } else {
        dispatch(AcademicYearOngoingFailed(res?.data));
      }
    } catch (err) {
      dispatch(AcademicYearOngoingFailed(err));
    }
  };
};
