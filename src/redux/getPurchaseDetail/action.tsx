import {
  PURCHASE_DETAIL_REQUEST,
  PURCHASE_DETAIL_SUCCESS,
  PURCHASE_DETAIL_FAILED,
  PURCHASE_DETAIL_DESTROY,
  PURCHASE_DETAIL_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';

const purchaseDetailRequest = () => {
  return {
    type: PURCHASE_DETAIL_REQUEST,
  };
};

const purchaseDetailSuccess = (data: any) => {
  return {
    type: PURCHASE_DETAIL_SUCCESS,
    payload: data,
  };
};

const purchaseDetailFailed = (error: any) => {
  return {
    type: PURCHASE_DETAIL_FAILED,
    payload: error,
  };
};

export const purchaseDetailDestroy = () => {
  return {
    type: PURCHASE_DETAIL_DESTROY,
  };
};

export const fetchPurchaseDetail = (id: number) => {
  return async (
    dispatch: Dispatch<PURCHASE_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(purchaseDetailRequest());
    try {
      const res = await api.get(`/purchase/v1/payment/${id}`);

      if (res?.status === 200) {
        dispatch(purchaseDetailSuccess(res?.data));
      } else {
        dispatch(purchaseDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(purchaseDetailFailed(err));
    }
  };
};
