import {
  GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_ACTION_TYPES,
  GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_DESTROY,
  GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_FAILED,
  GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_REQUEST,
  GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_SUCCESS,
} from './type';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';

const getStudentsOfflinetendanceSummaryRequest = () => {
  return {
    type: GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_REQUEST,
  };
};

const getStudentsOfflinetendanceSummarySuccess = (data: any) => {
  return {
    type: GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_SUCCESS,
    payload: {data},
  };
};

const getStudentsOfflinetendanceSummaryFailed = (error: any) => {
  return {
    type: GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_FAILED,
    payload: error,
  };
};

export const getStudentsOfflinetendanceSummaryDestroy = () => {
  return {
    type: GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_DESTROY,
  };
};

type _IFetchGetStudentsOfflinetendanceSummary = {
  rombel_class_school_id: any;
  date: string;
};

export const fetchGetStudentsOfflinetendanceSummary = (
  reqBody: _IFetchGetStudentsOfflinetendanceSummary,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getStudentsOfflinetendanceSummaryRequest());
    try {
      const res = await api.post(
        URL_PATH.get_students_offline_attendance_summary(),
        reqBody,
      );
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(getStudentsOfflinetendanceSummarySuccess(res?.data));
      } else {
        dispatch(getStudentsOfflinetendanceSummaryFailed(res?.data));
      }
    } catch (err) {
      dispatch(getStudentsOfflinetendanceSummaryFailed(err));
    }
  };
};
