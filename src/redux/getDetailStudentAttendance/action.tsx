import {
  DETAIL_ATTENDANCE_REQUEST,
  DETAIL_ATTENDANCE_SUCCESS,
  DETAIL_ATTENDANCE_FAILED,
  DETAIL_ATTENDANCE_DESTROY,
  DETAIL_ATTENDANCE_ACTION_TYPES,
  _IPayloadAttendanceDetail,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const getDetailAttendanceRequest = () => {
  return {
    type: DETAIL_ATTENDANCE_REQUEST,
  };
};

const getDetailAttendanceSuccess = (data: any) => {
  return {
    type: DETAIL_ATTENDANCE_SUCCESS,
    payload: {data},
  };
};

const getDetailAttendanceFailed = (error: any) => {
  return {
    type: DETAIL_ATTENDANCE_FAILED,
    payload: error,
  };
};

export const getDetailAttendanceDestroy = () => {
  return {
    type: DETAIL_ATTENDANCE_DESTROY,
  };
};

export const fetchDetailAttendanceStudent = (
  payload: _IPayloadAttendanceDetail,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<DETAIL_ATTENDANCE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getDetailAttendanceRequest());
    try {
      showLoading();
      const res = await api.post(URL_PATH.detail_student_attendance, payload);

      if (res?.status === 200) {
        dispatch(getDetailAttendanceSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getDetailAttendanceFailed(res?.data));
      }
    } catch (err) {
      dispatch(getDetailAttendanceFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
