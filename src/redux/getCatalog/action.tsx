import {
  CATALOG_REQUEST,
  CATALOG_SUCCESS,
  CATALOG_FAILED,
  CATALOG_DESTROY,
  CATALOG_ACTION_TYPES,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';

import {Dispatch} from 'redux';
import {Keys} from '@constants/keys';

const catalogRequest = () => {
  return {
    type: CATALOG_REQUEST,
  };
};

const catalogSuccess = (data: any) => {
  return {
    type: CATALOG_SUCCESS,
    payload: data,
  };
};

const catalogFailed = (error: any) => {
  return {
    type: CATALOG_FAILED,
    payload: error,
  };
};

export const catalogDestroy = () => {
  return {
    type: CATALOG_DESTROY,
  };
};

export const fetchCatalog = (): any => {
  return async (dispatch: Dispatch<CATALOG_ACTION_TYPES>): Promise<void> => {
    dispatch(catalogRequest());
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get('/purchase/v1/package-category', {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });

      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        const promises = data?.data.map(async (obj: any) => {
          if (obj?.image) {
            const imgRes = await api.get(`/media/v1/image/${obj?.image}`);

            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);
        dispatch(catalogSuccess(res?.data));
      } else {
        dispatch(catalogFailed(res?.data));
      }
    } catch (err) {
      dispatch(catalogFailed(err));
    }
  };
};
