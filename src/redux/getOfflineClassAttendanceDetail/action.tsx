import {
  GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_ACTION_TYPES,
  GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_DESTROY,
  GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_FAILED,
  GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_REQUEST,
  GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_SUCCESS,
} from './type';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';

const getOfflineClassAttendanceDetailRequest = () => {
  return {
    type: GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_REQUEST,
  };
};

const getOfflineClassAttendanceDetailSuccess = (data: any) => {
  return {
    type: GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_SUCCESS,
    payload: {data},
  };
};

const getOfflineClassAttendanceDetailFailed = (error: any) => {
  return {
    type: GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_FAILED,
    payload: error,
  };
};

export const getOfflineClassAttendanceDetailDestroy = () => {
  return {
    type: GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_DESTROY,
  };
};

type _IPayload = {
  rombel_class_school_id: number;
  semester: 'Genap' | 'Ganjil';
};

export const fetchGetOfflineClassAttendanceDetail = (
  payload: _IPayload,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<GET_OFFLINE_CLASS_ATTENDANCE_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getOfflineClassAttendanceDetailRequest());
    try {
      const res = await api.post(
        URL_PATH.get_offline_class_attendance_detail(),
        payload,
      );
      if (res?.status === 200) {
        dispatch(getOfflineClassAttendanceDetailSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getOfflineClassAttendanceDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(getOfflineClassAttendanceDetailFailed(err));
    }
  };
};
