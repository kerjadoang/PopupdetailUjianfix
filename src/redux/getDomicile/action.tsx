import {
  GET_DOMICILE_REQUEST,
  GET_DOMICILE_SUCCESS,
  GET_DOMICILE_FAILED,
  GET_DOMICILE_DESTROY,
  GET_DOMICILE_ACTION_TYPES,
} from './type';
import {Keys} from '@constants/keys';
import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_PATH} from '@constants/url';

const getDomicileRequest = () => {
  return {
    type: GET_DOMICILE_REQUEST,
  };
};

const getDomicileSuccess = (data: any) => {
  return {
    type: GET_DOMICILE_SUCCESS,
    payload: {data},
  };
};

const getDomicileFailed = (error: any) => {
  return {
    type: GET_DOMICILE_FAILED,
    payload: error,
  };
};

export const getDomicileDestroy = () => {
  return {
    type: GET_DOMICILE_DESTROY,
  };
};

export const fetchGetDomicile = (key: any): any => {
  return async (
    dispatch: Dispatch<GET_DOMICILE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getDomicileRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await api.get(`${URL_PATH.get_domicile(key)}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        dispatch(getDomicileSuccess(res?.data));
      } else {
        dispatch(getDomicileFailed(res?.data));
      }
    } catch (err) {
      dispatch(getDomicileFailed(err));
    }
  };
};
