import {
  GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_ACTION_TYPES,
  GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_DESTROY,
  GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_FAILED,
  GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_REQUEST,
  GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_SUCCESS,
} from './type';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';

const getStudentsOnlineAttendanceSummaryRequest = () => {
  return {
    type: GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_REQUEST,
  };
};

const getStudentsOnlineAttendanceSummarySuccess = (data: any) => {
  return {
    type: GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_SUCCESS,
    payload: {data},
  };
};

const getStudentsOnlineAttendanceSummaryFailed = (error: any) => {
  return {
    type: GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_FAILED,
    payload: error,
  };
};

export const getStudentsOnlineAttendanceSummaryDestroy = () => {
  return {
    type: GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_DESTROY,
  };
};

type _IFetchGetStudentsOnlineAttendanceSummary = {
  rombel_class_school_id: any;
  date: string;
};

export const fetchGetStudentsOnlineAttendanceSummary = (
  reqBody: _IFetchGetStudentsOnlineAttendanceSummary,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<GET_STUDENTS_ONLINE_ATTENDANCE_SUMMARY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getStudentsOnlineAttendanceSummaryRequest());
    try {
      const res = await api.post(
        URL_PATH.get_students_online_attendance_summary(),
        reqBody,
      );
      if (res?.status === 200) {
        dispatch(getStudentsOnlineAttendanceSummarySuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getStudentsOnlineAttendanceSummaryFailed(res?.data));
      }
    } catch (err) {
      dispatch(getStudentsOnlineAttendanceSummaryFailed(err));
    }
  };
};
