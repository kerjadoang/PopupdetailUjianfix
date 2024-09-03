import {
  STUDENT_ATTENDANCE_SUM_ACTION_TYPES,
  STUDENT_ATTENDANCE_SUM_DESTROY,
  STUDENT_ATTENDANCE_SUM_FAILED,
  STUDENT_ATTENDANCE_SUM_REQUEST,
  STUDENT_ATTENDANCE_SUM_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getStudentAttendanceRequest = () => {
  return {
    type: STUDENT_ATTENDANCE_SUM_REQUEST,
  };
};

const getStudentAttendanceSuccess = (data: any) => {
  return {
    type: STUDENT_ATTENDANCE_SUM_SUCCESS,
    payload: data,
  };
};

const getStudentAttendanceFailed = (error: any) => {
  return {
    type: STUDENT_ATTENDANCE_SUM_FAILED,
    payload: error,
  };
};

export const getStudentAttendanceDestroy = () => {
  return {
    type: STUDENT_ATTENDANCE_SUM_DESTROY,
  };
};

export const fetchStudentAttendance = (body: any): any => {
  return async (
    dispatch: Dispatch<STUDENT_ATTENDANCE_SUM_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getStudentAttendanceRequest());
    try {
      const res = await api.post(URL_PATH.student_attendance_summary, body);
      if (res?.status === 200) {
        dispatch(getStudentAttendanceSuccess(res?.data));
      } else {
        dispatch(getStudentAttendanceFailed(res?.data));
      }
    } catch (err) {
      dispatch(getStudentAttendanceFailed(err));
    }
  };
};
