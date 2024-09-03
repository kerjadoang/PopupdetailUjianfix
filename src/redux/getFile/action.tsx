import {
  FILE_REQUEST,
  FILE_SUCCESS,
  FILE_FAILED,
  FILE_DESTROY,
  FILE_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';

const fileRequest = () => {
  return {
    type: FILE_REQUEST,
  };
};

const fileSuccess = (data: any) => {
  return {
    type: FILE_SUCCESS,
    payload: data,
  };
};

const fileFailed = (error: any) => {
  return {
    type: FILE_FAILED,
    payload: error,
  };
};

export const fileDestroy = () => {
  return {
    type: FILE_DESTROY,
  };
};

export const fetchFile = (idFile: string, callback?: any): any => {
  return async (dispatch: Dispatch<FILE_ACTION_TYPES>): Promise<void> => {
    dispatch(fileRequest());
    try {
      const res = await api.get(`/media/v1/file/${idFile}`);
      callback ?? callback(res);
      if (res?.status === 200) {
        dispatch(fileSuccess(res?.data));
      } else {
        dispatch(fileFailed(res?.data));
      }
    } catch (err) {
      dispatch(fileFailed(err));
    }
  };
};
