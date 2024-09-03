import {
  GET_ROMBEL_WITH_STUDENT_REQUEST_ACTION_TYPES,
  GET_ROMBEL_WITH_STUDENT_REQUEST_DESTROY,
  GET_ROMBEL_WITH_STUDENT_REQUEST_FAILED,
  GET_ROMBEL_WITH_STUDENT_REQUEST_REQUEST,
  GET_ROMBEL_WITH_STUDENT_REQUEST_SUCCESS,
} from './type';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';

const getRombelWithStudentRequestsRequest = () => {
  return {
    type: GET_ROMBEL_WITH_STUDENT_REQUEST_REQUEST,
  };
};

const getRombelWithStudentRequestsSuccess = (data: any) => {
  return {
    type: GET_ROMBEL_WITH_STUDENT_REQUEST_SUCCESS,
    payload: {data},
  };
};

const getRombelWithStudentRequestsFailed = (error: any) => {
  return {
    type: GET_ROMBEL_WITH_STUDENT_REQUEST_FAILED,
    payload: error,
  };
};

export const getRombelWithStudentRequestsDestroy = () => {
  return {
    type: GET_ROMBEL_WITH_STUDENT_REQUEST_DESTROY,
  };
};

export const fetchGetRombelWithStudentRequests = (callback?: any) => {
  return async (
    dispatch: Dispatch<GET_ROMBEL_WITH_STUDENT_REQUEST_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getRombelWithStudentRequestsRequest());
    try {
      const res = await api.get(URL_PATH.get_rombel_with_student_requests());
      if (res?.status === 200) {
        dispatch(getRombelWithStudentRequestsSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getRombelWithStudentRequestsFailed(res?.data));
      }
    } catch (err) {
      dispatch(getRombelWithStudentRequestsFailed(err));
    }
  };
};
