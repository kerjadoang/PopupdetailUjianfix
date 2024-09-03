import {
  PRESENSI_ABSENT_REQUEST,
  PRESENSI_ABSENT_SUCCESS,
  PRESENSI_ABSENT_FAILED,
  PRESENSI_ABSENT_DESTROY,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const presensiAbsentRequest = () => {
  return {
    type: PRESENSI_ABSENT_REQUEST,
  };
};

const presensiAbsentSuccess = (data: any) => {
  return {
    type: PRESENSI_ABSENT_SUCCESS,
    payload: {data},
  };
};

const presensiAbsentFailed = (error: any) => {
  return {
    type: PRESENSI_ABSENT_FAILED,
    payload: error,
  };
};

export const presensiAbsentDestroy = () => {
  return {
    type: PRESENSI_ABSENT_DESTROY,
  };
};

export const fetchPresensiAbsent = () => {
  return async (
    dispatch: Dispatch<PRESENSI_ABSENT_ABSENT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(presensiAbsentRequest());
    try {
      const res = await api.get(URL_PATH.get_presensi_absent);
      if (res?.status === 200) {
        dispatch(presensiAbsentSuccess(res?.data));
      } else {
        dispatch(presensiAbsentFailed(res?.data));
      }
    } catch (err) {
      dispatch(presensiAbsentFailed(err));
    }
  };
};
