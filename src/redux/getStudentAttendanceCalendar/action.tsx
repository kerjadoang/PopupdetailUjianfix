import {
  GET_STUDENTS_ATTENDANCE_CALENDAR_ACTION_TYPES,
  GET_STUDENTS_ATTENDANCE_CALENDAR_DESTROY,
  GET_STUDENTS_ATTENDANCE_CALENDAR_FAILED,
  GET_STUDENTS_ATTENDANCE_CALENDAR_REQUEST,
  GET_STUDENTS_ATTENDANCE_CALENDAR_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import client from '@api/alternate';

const getStudentsAttendanceCalendarRequest = () => {
  return {
    type: GET_STUDENTS_ATTENDANCE_CALENDAR_REQUEST,
  };
};

const getStudentsAttendanceCalendarSuccess = (data: any) => {
  return {
    type: GET_STUDENTS_ATTENDANCE_CALENDAR_SUCCESS,
    payload: data,
  };
};

const getStudentsAttendanceCalendarFailed = (error: any) => {
  return {
    type: GET_STUDENTS_ATTENDANCE_CALENDAR_FAILED,
    payload: error,
  };
};

export const getStudentsAttendanceCalendarDestroy = () => {
  return {
    type: GET_STUDENTS_ATTENDANCE_CALENDAR_DESTROY,
  };
};

export const fetchGetStudentsAttendanceCalendar = (
  studentId: any,
  month?: string, //2003-02
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<GET_STUDENTS_ATTENDANCE_CALENDAR_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getStudentsAttendanceCalendarRequest());
    try {
      const res = await client.get(
        month
          ? URL_PATH.get_student_attendance_calendar(studentId, month)
          : URL_PATH.get_student_attendance_calendar(studentId),
      );

      if (res?.status === 200) {
        callback && callback(res);
        dispatch(getStudentsAttendanceCalendarSuccess(res?.data));
      } else {
        callback && callback(res);
        dispatch(getStudentsAttendanceCalendarFailed(res?.data));
      }
    } catch (err) {
      callback && callback(err);
      dispatch(getStudentsAttendanceCalendarFailed(err));
    }
  };
};
