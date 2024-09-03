import {
  PRESENSI_ATTEND_REQUEST,
  PRESENSI_ATTEND_SUCCESS,
  PRESENSI_ATTEND_FAILED,
  PRESENSI_ATTEND_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const presensiRequest = () => {
  return {
    type: PRESENSI_ATTEND_REQUEST,
  };
};

const presensiSuccess = (data: any) => {
  return {
    type: PRESENSI_ATTEND_SUCCESS,
    payload: {data},
  };
};

const presensiFailed = (error: any) => {
  return {
    type: PRESENSI_ATTEND_FAILED,
    payload: error,
  };
};

export const fetchPresensiAttend = () => {
  return async (
    dispatch: Dispatch<PRESENSI_ATTEND_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(presensiRequest());
    try {
      const res = await api.get(URL_PATH.get_presensi_attend);
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
