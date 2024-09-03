import {
  GET_UJIAN_AKHIR_TAHUN_PACKAGE_ACTION_TYPES,
  GET_UJIAN_AKHIR_TAHUN_PACKAGE_DESTROY,
  GET_UJIAN_AKHIR_TAHUN_PACKAGE_FAILED,
  GET_UJIAN_AKHIR_TAHUN_PACKAGE_REQUEST,
  GET_UJIAN_AKHIR_TAHUN_PACKAGE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getUjianAkhirTahunRequest = () => {
  return {
    type: GET_UJIAN_AKHIR_TAHUN_PACKAGE_REQUEST,
  };
};

const getUjianAkhirTahunSuccess = (data: any) => {
  return {
    type: GET_UJIAN_AKHIR_TAHUN_PACKAGE_SUCCESS,
    payload: data,
  };
};

const getUjianAkhirTahunFailed = (error: any) => {
  return {
    type: GET_UJIAN_AKHIR_TAHUN_PACKAGE_FAILED,
    payload: error,
  };
};

export const getUjianAkhirTahunDestroy = () => {
  return {
    type: GET_UJIAN_AKHIR_TAHUN_PACKAGE_DESTROY,
  };
};

export const fetchGetUjianAkhirTahun = (
  subject_id: number,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_UJIAN_AKHIR_TAHUN_PACKAGE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getUjianAkhirTahunRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(
        URL_PATH.get_ujian_akhir_tahun_package(subject_id),
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
            'Device-id': '',
          },
        },
      );
      if (res?.status === 200) {
        dispatch(getUjianAkhirTahunSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getUjianAkhirTahunFailed(res?.data));
      }
    } catch (err) {
      dispatch(getUjianAkhirTahunFailed(err));
    }
  };
};
