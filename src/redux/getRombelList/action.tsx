import {
  ROMBEL_REQUEST,
  ROMBEL_SUCCESS,
  ROMBEL_FAILED,
  ROMBEL_DESTROY,
  ROMBEL_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const RombelRequest = () => {
  return {
    type: ROMBEL_REQUEST,
  };
};

const RombelSuccess = (data: any) => {
  return {
    type: ROMBEL_SUCCESS,
    payload: {data},
  };
};

const RombelFailed = (error: any) => {
  return {
    type: ROMBEL_FAILED,
    payload: error,
  };
};

export const RombelDestroy = () => {
  return {
    type: ROMBEL_DESTROY,
  };
};

export const fetchRombel = () => {
  return async (dispatch: Dispatch<ROMBEL_ACTION_TYPES>): Promise<void> => {
    dispatch(RombelRequest());
    try {
      const res = await api.get(URL_PATH.get_rombel);
      if (res?.status === 200) {
        dispatch(RombelSuccess(res?.data));
      } else {
        dispatch(RombelFailed(res?.data));
      }
    } catch (err) {
      dispatch(RombelFailed(err));
    }
  };
};
