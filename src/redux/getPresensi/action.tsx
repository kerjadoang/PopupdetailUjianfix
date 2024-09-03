import {
  PRESENSI_REQUEST,
  PRESENSI_SUCCESS,
  PRESENSI_FAILED,
  PRESENSI_DESTROY,
  PRESENSI_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const presensiRequest = () => {
  return {
    type: PRESENSI_REQUEST,
  };
};

const presensiSuccess = (data: any) => {
  return {
    type: PRESENSI_SUCCESS,
    payload: {data},
  };
};

const presensiFailed = (error: any) => {
  return {
    type: PRESENSI_FAILED,
    payload: error,
  };
};

export const presensiDestroy = () => {
  return {
    type: PRESENSI_DESTROY,
  };
};

export const fetchPresensi = () => {
  return async (dispatch: Dispatch<PRESENSI_ACTION_TYPES>): Promise<void> => {
    dispatch(presensiRequest());
    try {
      const res = await api.get(URL_PATH.get_presensi);
      if (res?.status === 200) {
        dispatch(presensiSuccess(res?.data));
      } else {
        dispatch(presensiFailed(res?.data));
      }
    } catch (err) {
      dispatch(presensiFailed(err));
    }
  };
};
