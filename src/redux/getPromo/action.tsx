import {
  GET_PROMO_ACTION_TYPES,
  GET_PROMO_DESTROY,
  GET_PROMO_FAILED,
  GET_PROMO_REQUEST,
  GET_PROMO_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';

const getPromoRequest = () => {
  return {
    type: GET_PROMO_REQUEST,
  };
};

const getPromoSuccess = (data: any) => {
  return {
    type: GET_PROMO_SUCCESS,
    payload: data,
  };
};

const getPromoFailed = (error: any) => {
  return {
    type: GET_PROMO_FAILED,
    payload: error,
  };
};

export const getPromoDestroy = () => {
  return {
    type: GET_PROMO_DESTROY,
  };
};

export const fetchGetPromo = (limit: any, callback?: any): any => {
  return async (dispatch: Dispatch<GET_PROMO_ACTION_TYPES>): Promise<void> => {
    dispatch(getPromoRequest());
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(`notification/v1/promo/${limit ?? 5}/0`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        const promises = data?.data.map(async (obj: any) => {
          if (obj?.id_image) {
            const imgRes = await api.get(`/media/v1/image/${obj?.id_image}`);
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });
        await Promise.all(promises);
        callback && callback(res);
        dispatch(getPromoSuccess(res?.data));
      } else {
        dispatch(getPromoFailed(res?.data));
      }
    } catch (err) {
      dispatch(getPromoFailed(err));
    }
  };
};
