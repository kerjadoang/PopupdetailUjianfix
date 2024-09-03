import api from '@api/index';
import {Dispatch} from 'redux';
import {
  TODAY_ATTENDANCE_ACTION_TYPES,
  TODAY_ATTENDANCE_DESTROY,
  TODAY_ATTENDANCE_FAILED,
  TODAY_ATTENDANCE_REQUEST,
  TODAY_ATTENDANCE_SUCCESS,
} from './type';

const todayAttendanceRequest = () => {
  return {
    type: TODAY_ATTENDANCE_REQUEST,
  };
};

const todayAttendanceSuccess = (data: any) => {
  return {
    type: TODAY_ATTENDANCE_SUCCESS,
    payload: data,
  };
};

const todayAttendanceFailed = (error: any) => {
  return {
    type: TODAY_ATTENDANCE_FAILED,
    payload: error,
  };
};

export const todayAttendanceDestroy = () => {
  return {
    type: TODAY_ATTENDANCE_DESTROY,
  };
};

export const fetchTodayAttendance = (): any => {
  return async (
    dispatch: Dispatch<TODAY_ATTENDANCE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(todayAttendanceRequest());
    try {
      const res = await api.get('/lms/v1/attendance/get-today-attendance');

      const data = res?.data || [];
      if (res?.status === 200) {
        dispatch(todayAttendanceSuccess(data));
      } else {
        dispatch(todayAttendanceFailed(data));
      }
    } catch (err) {
      dispatch(todayAttendanceFailed(err));
    }
  };
};
