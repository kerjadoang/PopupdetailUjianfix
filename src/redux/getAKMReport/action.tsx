import {
  AKM_REQUEST,
  AKM_SUCCESS,
  AKM_FAILED,
  AKM_DESTROY,
  AKM_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const AKMRequest = () => {
  return {
    type: AKM_REQUEST,
  };
};

const AKMSuccess = (data: any) => {
  return {
    type: AKM_SUCCESS,
    payload: {data},
  };
};

const AKMFailed = (error: any) => {
  return {
    type: AKM_FAILED,
    payload: error,
  };
};

export const AKMDestroy = () => {
  return {
    type: AKM_DESTROY,
  };
};

export const fetchAKM = () => {
  return async (dispatch: Dispatch<AKM_ACTION_TYPES>): Promise<void> => {
    dispatch(AKMRequest());
    try {
      const res = await api.get(URL_PATH.get_report_akm);
      if (res?.status === 200) {
        dispatch(AKMSuccess(res?.data));
      } else {
        dispatch(AKMFailed(res?.data));
      }
    } catch (err) {
      dispatch(AKMFailed(err));
    }
  };
};
