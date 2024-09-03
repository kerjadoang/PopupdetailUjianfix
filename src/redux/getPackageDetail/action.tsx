import {
  PACKAGE_DETAIL_REQUEST,
  PACKAGE_DETAIL_SUCCESS,
  PACKAGE_DETAIL_FAILED,
  PACKAGE_DETAIL_DESTROY,
  PACKAGE_DETAIL_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import axios from 'axios';
import Config from 'react-native-config';

const packageDetailRequest = () => {
  return {
    type: PACKAGE_DETAIL_REQUEST,
  };
};

const packageDetailSuccess = (data: any) => {
  return {
    type: PACKAGE_DETAIL_SUCCESS,
    payload: data,
  };
};

const packageDetailFailed = (error: any) => {
  return {
    type: PACKAGE_DETAIL_FAILED,
    payload: error,
  };
};

export const packageDetailDestroy = () => {
  return {
    type: PACKAGE_DETAIL_DESTROY,
  };
};

export const fetchPackageDetail = (token?: any) => {
  return async (
    dispatch: Dispatch<PACKAGE_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(packageDetailRequest());
    try {
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');

      const res = await axios.get(
        `${Config.BASEURL}/purchase/v1/user-package/active`,
        {
          headers: {
            Authorization: `Bearer ${token || tokenParse}`,
          },
        },
      );

      if (res?.status === 200) {
        const data = res?.data || [];

        const promises = data?.data?.package?.map(async (obj: any) => {
          if (obj?.icon_mobile) {
            const imgRes = await api.get(`/media/v1/image/${obj?.icon_mobile}`);

            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });
        await Promise.all(promises);
        dispatch(packageDetailSuccess(res?.data));
      } else {
        dispatch(packageDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(packageDetailFailed(err));
    }
  };
};
