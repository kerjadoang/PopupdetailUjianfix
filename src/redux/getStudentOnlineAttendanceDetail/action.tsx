import {
  GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_ACTION_TYPES,
  GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_DESTROY,
  GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_FAILED,
  GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_REQUEST,
  GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_SUCCESS,
} from './type';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';

const getStudentOnlineAttendanceDetailRequest = () => {
  return {
    type: GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_REQUEST,
  };
};

const getStudentOnlineAttendanceDetailSuccess = (data: any) => {
  return {
    type: GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_SUCCESS,
    payload: {data},
  };
};

const getStudentOnlineAttendanceDetailFailed = (error: any) => {
  return {
    type: GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_FAILED,
    payload: error,
  };
};

export const getStudentOnlineAttendanceDetailDestroy = () => {
  return {
    type: GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_DESTROY,
  };
};

type _IFetchGetStudentsAbsentRequestHistory = {
  rombel_class_school_id: number;
  // semester: 'Genap' | 'Ganjil' | '';
  semester: string;
  sortBy: string;
};

export const fetchGetStudentOnlineAttendanceDetail = (
  reqBody: _IFetchGetStudentsAbsentRequestHistory,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<GET_STUDENT_ONLINE_ATTENDANCE_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getStudentOnlineAttendanceDetailRequest());
    try {
      const res = await api.post(
        URL_PATH.get_student_online_attendance_detail(reqBody?.sortBy),
        {
          rombel_class_school_id: reqBody?.rombel_class_school_id,
          semester: reqBody?.semester,
        },
      );
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(getStudentOnlineAttendanceDetailSuccess(res?.data));
      } else {
        dispatch(getStudentOnlineAttendanceDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(getStudentOnlineAttendanceDetailFailed(err));
    }
  };
};
