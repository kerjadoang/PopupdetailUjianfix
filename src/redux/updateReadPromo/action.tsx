import api from '@api/index';
import {
  UPDATE_READ_PROMO_ACTION_TYPES,
  UPDATE_READ_PROMO_DESTROY,
  UPDATE_READ_PROMO_FAILED,
  UPDATE_READ_PROMO_REQUEST,
  UPDATE_READ_PROMO_SUCCESS,
} from './type';

import {Dispatch} from 'redux';

const updateReadPromoRequest = () => {
  return {
    type: UPDATE_READ_PROMO_REQUEST,
  };
};

const updateReadPromoSuccess = (data: any) => {
  return {
    type: UPDATE_READ_PROMO_SUCCESS,
    payload: data,
  };
};

const updateReadPromoFailed = (error: any) => {
  return {
    type: UPDATE_READ_PROMO_FAILED,
    payload: error,
  };
};

export const updateReadPromoDestroy = () => {
  return {
    type: UPDATE_READ_PROMO_DESTROY,
  };
};

export const fetchUpdateReadPromo = (uuid: any, callback?: any): any => {
  return async (
    dispatch: Dispatch<UPDATE_READ_PROMO_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(updateReadPromoRequest());
    try {
      const res = await api.put(`notification/v1/promo/${uuid}`);
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(updateReadPromoSuccess(res?.data));
      } else {
        dispatch(updateReadPromoFailed(res?.data));
      }
    } catch (err) {
      dispatch(updateReadPromoFailed(err));
    }
  };
};
