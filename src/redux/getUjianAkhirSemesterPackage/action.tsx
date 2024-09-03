import {
  GET_UJIAN_AKHIR_SEMESTER_PACKAGE_ACTION_TYPES,
  GET_UJIAN_AKHIR_SEMESTER_PACKAGE_DESTROY,
  GET_UJIAN_AKHIR_SEMESTER_PACKAGE_FAILED,
  GET_UJIAN_AKHIR_SEMESTER_PACKAGE_REQUEST,
  GET_UJIAN_AKHIR_SEMESTER_PACKAGE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getUjianAkhirSemesterRequest = () => {
  return {
    type: GET_UJIAN_AKHIR_SEMESTER_PACKAGE_REQUEST,
  };
};

const getUjianAkhirSemesterSuccess = (data: any) => {
  return {
    type: GET_UJIAN_AKHIR_SEMESTER_PACKAGE_SUCCESS,
    payload: data,
  };
};

const getUjianAkhirSemesterFailed = (error: any) => {
  return {
    type: GET_UJIAN_AKHIR_SEMESTER_PACKAGE_FAILED,
    payload: error,
  };
};

export const getUjianAkhirSemesterDestroy = () => {
  return {
    type: GET_UJIAN_AKHIR_SEMESTER_PACKAGE_DESTROY,
  };
};

export const fetchGetUjianAkhirSemester = (
  subject_id: number,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_UJIAN_AKHIR_SEMESTER_PACKAGE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getUjianAkhirSemesterRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(
        URL_PATH.get_ujian_akhir_semester_package(subject_id),
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
            'Device-id': '',
          },
        },
      );
      if (res?.status === 200) {
        dispatch(getUjianAkhirSemesterSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getUjianAkhirSemesterFailed(res?.data));
      }
    } catch (err) {
      dispatch(getUjianAkhirSemesterFailed(err));
    }
  };
};
