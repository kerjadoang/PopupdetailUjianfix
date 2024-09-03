import {
  PURCHASE_REQUEST,
  PURCHASE_SUCCESS,
  PURCHASE_FAILED,
  PURCHASE_DESTROY,
  PURCHASE_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';

const purchaseRequest = () => {
  return {
    type: PURCHASE_REQUEST,
  };
};

const purchaseSuccess = (data: any) => {
  return {
    type: PURCHASE_SUCCESS,
    payload: data,
  };
};

const purchaseFailed = (error: any) => {
  return {
    type: PURCHASE_FAILED,
    payload: error,
  };
};

export const purchaseDestroy = () => {
  return {
    type: PURCHASE_DESTROY,
  };
};

export const fetchPurchase = (status: string, token?: string) => {
  return async (dispatch: Dispatch<PURCHASE_ACTION_TYPES>): Promise<void> => {
    dispatch(purchaseRequest());
    try {
      const res = await api.get(
        `/purchase/v1/payment/?page=0&limit=10&status=${status}`,
        {
          headers: token && {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res?.status === 200) {
        dispatch(purchaseSuccess(res?.data));
      } else {
        dispatch(purchaseFailed(res?.data));
      }
    } catch (err) {
      dispatch(purchaseFailed(err));
    }
  };
};
