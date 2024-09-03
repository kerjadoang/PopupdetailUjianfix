import {
  GET_ADMINISTRATIVE_HISTORY_ACTION_TYPES,
  GET_ADMINISTRATIVE_HISTORY_DESTROY,
  GET_ADMINISTRATIVE_HISTORY_FAILED,
  GET_ADMINISTRATIVE_HISTORY_REQUEST,
  GET_ADMINISTRATIVE_HISTORY_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';

const getAllAdministrativeHistoryRequest = () => {
  return {
    type: GET_ADMINISTRATIVE_HISTORY_REQUEST,
  };
};

const getAllAdministrativeHistorySuccess = (data: any, params: any) => {
  return {
    type: GET_ADMINISTRATIVE_HISTORY_SUCCESS,
    payload: {
      data,
      params,
    },
  };
};

const getAllAdministrativeHistoryFailed = (error: any) => {
  return {
    type: GET_ADMINISTRATIVE_HISTORY_FAILED,
    payload: error,
  };
};

export const getAllAdministrativeHistoryDestroy = () => {
  return {
    type: GET_ADMINISTRATIVE_HISTORY_DESTROY,
  };
};

export const fetchGetAllAdministrativeHistory = (
  body: any,
  userId: any,
): any => {
  return async (
    dispatch: Dispatch<GET_ADMINISTRATIVE_HISTORY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllAdministrativeHistoryRequest());
    try {
      const res = await api.post(
        '/lms/v1/administration/history/user/' + userId,
        body,
      );
      if (res?.status === 200) {
        dispatch(getAllAdministrativeHistorySuccess(res?.data, body));
      } else {
        dispatch(getAllAdministrativeHistoryFailed(res?.data));
      }
    } catch (err) {
      dispatch(getAllAdministrativeHistoryFailed(err));
    }
  };
};
