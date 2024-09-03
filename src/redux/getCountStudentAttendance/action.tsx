import {
  STUDENT_YEARLY_ATTENDANCE_REQUEST,
  STUDENT_YEARLY_ATTENDANCE_SUCCESS,
  STUDENT_YEARLY_ATTENDANCE_FAILED,
  STUDENT_YEARLY_ATTENDANCE_DESTROY,
  STUDENT_YEARLY_ATTENDANCE_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const studentYearlyAttendanceRequest = () => {
  return {
    type: STUDENT_YEARLY_ATTENDANCE_REQUEST,
  };
};

const studentYearlyAttendanceSuccess = (data: any) => {
  return {
    type: STUDENT_YEARLY_ATTENDANCE_SUCCESS,
    payload: {data},
  };
};

const studentYearlyAttendanceFailed = (error: any) => {
  return {
    type: STUDENT_YEARLY_ATTENDANCE_FAILED,
    payload: error,
  };
};

export const studentYearlyAttendanceDestroy = () => {
  return {
    type: STUDENT_YEARLY_ATTENDANCE_DESTROY,
  };
};

export const fetchStudentYearlyAttendance = (student_id: number) => {
  return async (
    dispatch: Dispatch<STUDENT_YEARLY_ATTENDANCE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(studentYearlyAttendanceRequest());
    try {
      const res = await api.get(
        URL_PATH.count_yearly_student_attendance(student_id),
      );
      if (res?.status === 200) {
        dispatch(studentYearlyAttendanceSuccess(res?.data));
      } else {
        dispatch(studentYearlyAttendanceFailed(res?.data));
      }
    } catch (err) {
      dispatch(studentYearlyAttendanceFailed(err));
    }
  };
};
