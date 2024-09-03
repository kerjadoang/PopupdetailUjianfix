import {
  UPDATE_READ_ALL_PROMO_ACTION_TYPES,
  UPDATE_READ_ALL_PROMO_DESTROY,
  UPDATE_READ_ALL_PROMO_FAILED,
  UPDATE_READ_ALL_PROMO_REQUEST,
  UPDATE_READ_ALL_PROMO_SUCCESS,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';

const updateReadAllPromoRequest = () => {
  return {
    type: UPDATE_READ_ALL_PROMO_REQUEST,
  };
};

const updateReadAllPromoSuccess = (data: any) => {
  return {
    type: UPDATE_READ_ALL_PROMO_SUCCESS,
    payload: data,
  };
};

const updateReadAllPromoFailed = (error: any) => {
  return {
    type: UPDATE_READ_ALL_PROMO_FAILED,
    payload: error,
  };
};

export const updateReadAllPromoDestroy = () => {
  return {
    type: UPDATE_READ_ALL_PROMO_DESTROY,
  };
};

export const fetchUpdateReadAllPromo = (callback?: any) => {
  return async (
    dispatch: Dispatch<UPDATE_READ_ALL_PROMO_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(updateReadAllPromoRequest());
    try {
      const res = await api.get('notification/v1/promo/readall');
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(updateReadAllPromoSuccess(res?.data));
      } else {
        dispatch(updateReadAllPromoFailed(res?.data));
      }
    } catch (err) {
      dispatch(updateReadAllPromoFailed(err));
    }
  };
};
