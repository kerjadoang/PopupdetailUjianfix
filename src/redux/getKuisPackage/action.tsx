import {
  GET_KUIS_PACKAGES_ACTION_TYPES,
  GET_KUIS_PACKAGES_DESTROY,
  GET_KUIS_PACKAGES_FAILED,
  GET_KUIS_PACKAGES_REQUEST,
  GET_KUIS_PACKAGES_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getKuisPackagesRequest = () => {
  return {
    type: GET_KUIS_PACKAGES_REQUEST,
  };
};

const getKuisPackagesSuccess = (data: any) => {
  return {
    type: GET_KUIS_PACKAGES_SUCCESS,
    payload: data,
  };
};

const getKuisPackagesFailed = (error: any) => {
  return {
    type: GET_KUIS_PACKAGES_FAILED,
    payload: error,
  };
};

export const getKuisPackagesDestroy = () => {
  return {
    type: GET_KUIS_PACKAGES_DESTROY,
  };
};

export const fetchGetKuisPackages = (
  chapter_id: string,
  callback?: (data: any) => void,
): any => {
  return async (
    dispatch: Dispatch<GET_KUIS_PACKAGES_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getKuisPackagesRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(URL_PATH.get_kuis_packages(chapter_id), {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
          'Device-id': '',
        },
      });
      if (res?.status === 200) {
        dispatch(getKuisPackagesSuccess(res?.data));
        callback?.(res?.data);
      } else {
        dispatch(getKuisPackagesFailed(res?.data));
      }
    } catch (err) {
      dispatch(getKuisPackagesFailed(err));
    }
  };
};
