import {
  GET_UJIAN_SEKOLAH_PACKAGE_ACTION_TYPES,
  GET_UJIAN_SEKOLAH_PACKAGE_DESTROY,
  GET_UJIAN_SEKOLAH_PACKAGE_FAILED,
  GET_UJIAN_SEKOLAH_PACKAGE_REQUEST,
  GET_UJIAN_SEKOLAH_PACKAGE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getUjianSekolahRequest = () => {
  return {
    type: GET_UJIAN_SEKOLAH_PACKAGE_REQUEST,
  };
};

const getUjianSekolahSuccess = (data: any) => {
  return {
    type: GET_UJIAN_SEKOLAH_PACKAGE_SUCCESS,
    payload: data,
  };
};

const getUjianSekolahFailed = (error: any) => {
  return {
    type: GET_UJIAN_SEKOLAH_PACKAGE_FAILED,
    payload: error,
  };
};

export const getUjianSekolahDestroy = () => {
  return {
    type: GET_UJIAN_SEKOLAH_PACKAGE_DESTROY,
  };
};

export const fetchGetUjianSekolah = (
  subject_id: number,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_UJIAN_SEKOLAH_PACKAGE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getUjianSekolahRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(
        URL_PATH.get_ujian_sekolah_package(subject_id),
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
            'Device-id': '',
          },
        },
      );
      if (res?.status === 200) {
        dispatch(getUjianSekolahSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getUjianSekolahFailed(res?.data));
      }
    } catch (err) {
      dispatch(getUjianSekolahFailed(err));
    }
  };
};
