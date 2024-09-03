import {
  GET_PAYMENT_ADMINISTRATIVE_CATEGORY_ACTION_TYPES,
  GET_PAYMENT_ADMINISTRATIVE_CATEGORY_DESTROY,
  GET_PAYMENT_ADMINISTRATIVE_CATEGORY_FAILED,
  GET_PAYMENT_ADMINISTRATIVE_CATEGORY_REQUEST,
  GET_PAYMENT_ADMINISTRATIVE_CATEGORY_SUCCESS,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const getPaymentAdministrativeCategoryRequest = () => {
  return {
    type: GET_PAYMENT_ADMINISTRATIVE_CATEGORY_REQUEST,
  };
};

const getPaymentAdministrativeCategorySuccess = (data: any) => {
  return {
    type: GET_PAYMENT_ADMINISTRATIVE_CATEGORY_SUCCESS,
    payload: data,
  };
};

const getPaymentAdministrativeCategoryFailed = (error: any) => {
  return {
    type: GET_PAYMENT_ADMINISTRATIVE_CATEGORY_FAILED,
    payload: error,
  };
};

export const getPaymentAdministrativeCategoryDestroy = () => {
  return {
    type: GET_PAYMENT_ADMINISTRATIVE_CATEGORY_DESTROY,
  };
};

export const fetchGetPaymentAdministrativeCategory = () => {
  return async (
    dispatch: Dispatch<GET_PAYMENT_ADMINISTRATIVE_CATEGORY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getPaymentAdministrativeCategoryRequest());
    try {
      const res = await api.get(URL_PATH.get_list_payment_category);

      if (res?.status === 200) {
        dispatch(getPaymentAdministrativeCategorySuccess(res?.data));
      } else {
        dispatch(getPaymentAdministrativeCategoryFailed(res?.data));
      }
    } catch (err) {
      dispatch(getPaymentAdministrativeCategoryFailed(err));
    }
  };
};
