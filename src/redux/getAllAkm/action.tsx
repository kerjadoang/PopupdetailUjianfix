import {
  GET_ALL_AKM_ACTION_TYPES,
  GET_ALL_AKM_DESTROY,
  GET_ALL_AKM_FAILED,
  GET_ALL_AKM_REQUEST,
  GET_ALL_AKM_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import client from '@api/alternate';

const getAllAkmRequest = () => {
  return {
    type: GET_ALL_AKM_REQUEST,
  };
};

const getAllAkmSuccess = (data: any) => {
  return {
    type: GET_ALL_AKM_SUCCESS,
    payload: data,
  };
};

const getAllAkmFailed = (error: any) => {
  return {
    type: GET_ALL_AKM_FAILED,
    payload: error,
  };
};

export const getAllAkmDestroy = () => {
  return {
    type: GET_ALL_AKM_DESTROY,
  };
};

export const fetchGetAllAkm = (callback?: any): any => {
  return async (
    dispatch: Dispatch<GET_ALL_AKM_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllAkmRequest());
    try {
      const res = await client.get(URL_PATH.get_all_akm());
      callback && callback(res);

      if (res?.status === 200) {
        dispatch(getAllAkmSuccess(res?.data));
      } else {
        dispatch(getAllAkmFailed(res?.data));
      }
    } catch (err) {
      callback && callback(err);
      dispatch(getAllAkmFailed(err));
    }
  };
};
