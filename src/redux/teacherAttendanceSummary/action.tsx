import {
  TEACHER_ATTENDANCE_SUM_ACTION_TYPES,
  TEACHER_ATTENDANCE_SUM_DESTROY,
  TEACHER_ATTENDANCE_SUM_FAILED,
  TEACHER_ATTENDANCE_SUM_REQUEST,
  TEACHER_ATTENDANCE_SUM_SUCCESS,
  _IPayloadTeacherAttendance,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getTeacherAttendanceRequest = () => {
  return {
    type: TEACHER_ATTENDANCE_SUM_REQUEST,
  };
};

const getTeacherAttendanceSuccess = (data: any) => {
  return {
    type: TEACHER_ATTENDANCE_SUM_SUCCESS,
    payload: data,
  };
};

const getTeacherAttendanceFailed = (error: any) => {
  return {
    type: TEACHER_ATTENDANCE_SUM_FAILED,
    payload: error,
  };
};

export const getTeacherAttendanceDestroy = () => {
  return {
    type: TEACHER_ATTENDANCE_SUM_DESTROY,
  };
};

export const fetchTeacherAttendance = (
  payload: _IPayloadTeacherAttendance,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<TEACHER_ATTENDANCE_SUM_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getTeacherAttendanceRequest());
    try {
      const res = await api.post(URL_PATH.teacher_attendance_summary, payload);
      if (res?.status === 200) {
        dispatch(getTeacherAttendanceSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getTeacherAttendanceFailed(res?.data));
      }
    } catch (err) {
      dispatch(getTeacherAttendanceFailed(err));
    }
  };
};
