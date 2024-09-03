import {
  CS_REKAMAN_REQUEST,
  CS_REKAMAN_SUCCESS,
  CS_REKAMAN_FAILED,
  CS_REKAMAN_DESTROY,
  CS_REKAMAN_ACTION_TYPES,
} from './type';
import api from '@api';
import {URL_PATH} from '@constants/url';

import {Dispatch} from 'redux';

const classSessionRekamanRequest = () => {
  return {
    type: CS_REKAMAN_REQUEST,
  };
};

const classSessionRekamanSuccess = (data: any) => {
  return {
    type: CS_REKAMAN_SUCCESS,
    payload: data,
  };
};

const classSessionRekamanFailed = (error: any) => {
  return {
    type: CS_REKAMAN_FAILED,
    payload: error,
  };
};

export const classSessionRekamanDestroy = () => {
  return {
    type: CS_REKAMAN_DESTROY,
  };
};

export const fetchClassSessionRekaman = () => {
  return async (dispatch: Dispatch<CS_REKAMAN_ACTION_TYPES>): Promise<void> => {
    dispatch(classSessionRekamanRequest());
    try {
      const res = await api.get(URL_PATH.get_rekaman_class('guru', 0, 10));

      if (res?.status === 200) {
        dispatch(classSessionRekamanSuccess(res?.data));
      } else {
        dispatch(classSessionRekamanFailed(res?.data));
      }
    } catch (err) {
      dispatch(classSessionRekamanFailed(err));
    }
  };
};
