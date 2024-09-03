import {
  GET_STUDENTS_ABSENT_REQUEST_HISTORY_ACTION_TYPES,
  GET_STUDENTS_ABSENT_REQUEST_HISTORY_DESTROY,
  GET_STUDENTS_ABSENT_REQUEST_HISTORY_FAILED,
  GET_STUDENTS_ABSENT_REQUEST_HISTORY_REQUEST,
  GET_STUDENTS_ABSENT_REQUEST_HISTORY_SUCCESS,
} from './type';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';

const getStudentsAbsentRequestHistoryRequest = () => {
  return {
    type: GET_STUDENTS_ABSENT_REQUEST_HISTORY_REQUEST,
  };
};

const getStudentsAbsentRequestHistorySuccess = (data: any) => {
  return {
    type: GET_STUDENTS_ABSENT_REQUEST_HISTORY_SUCCESS,
    payload: {data},
  };
};

const getStudentsAbsentRequestHistoryFailed = (error: any) => {
  return {
    type: GET_STUDENTS_ABSENT_REQUEST_HISTORY_FAILED,
    payload: error,
  };
};

export const getStudentsAbsentRequestHistoryDestroy = () => {
  return {
    type: GET_STUDENTS_ABSENT_REQUEST_HISTORY_DESTROY,
  };
};

type _IFetchGetStudentsAbsentRequestHistory = {
  rombel_class_school_id: any;
  approval_status: 'menunggu' | 'diterima' | 'ditolak';
  start_date: string;
  end_date: string;
};

export const fetchGetStudentsAbsentRequestHistory = (
  reqBody: _IFetchGetStudentsAbsentRequestHistory,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<GET_STUDENTS_ABSENT_REQUEST_HISTORY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getStudentsAbsentRequestHistoryRequest());
    try {
      const res = await api.post(
        URL_PATH.get_students_absent_request_history(),
        reqBody,
      );
      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        const promises = data?.data.map(async (obj: any) => {
          if (obj?.avatar) {
            const imgRes = await api.get(`/media/v1/image/${obj?.avatar}`);
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.avatarUrl = imgRes?.data?.data?.path_url;
              obj.avatarUrlId = imgRes?.data?.data?.ID;
            }
          }
        });

        await Promise.all(promises);
        dispatch(getStudentsAbsentRequestHistorySuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getStudentsAbsentRequestHistoryFailed(res?.data));
      }
    } catch (err) {
      dispatch(getStudentsAbsentRequestHistoryFailed(err));
    }
  };
};
