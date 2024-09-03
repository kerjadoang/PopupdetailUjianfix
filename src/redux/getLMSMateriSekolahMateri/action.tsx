import {
  GET_LMS_MATERI_SEKOLAH_MATERI_ACTION_TYPES,
  GET_LMS_MATERI_SEKOLAH_MATERI_DESTROY,
  GET_LMS_MATERI_SEKOLAH_MATERI_FAILED,
  GET_LMS_MATERI_SEKOLAH_MATERI_REQUEST,
  GET_LMS_MATERI_SEKOLAH_MATERI_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getLMSMateriSekolahMateriRequest = () => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_MATERI_REQUEST,
  };
};

const getLMSMateriSekolahMateriSuccess = (data: any) => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_MATERI_SUCCESS,
    payload: data,
  };
};

const getLMSMateriSekolahMateriFailed = (error: any) => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_MATERI_FAILED,
    payload: error,
  };
};

export const getLMSMateriSekolahMateriDestroy = () => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_MATERI_DESTROY,
  };
};

export const fetchGetLMSMateriSekolahMateri = (
  chapter_id: string,
  callback?: any,
  errCallback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_LMS_MATERI_SEKOLAH_MATERI_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getLMSMateriSekolahMateriRequest());
    try {
      const res = await api.get(
        URL_PATH.get_lms_materi_sekolah_materi(chapter_id),
      );

      if (res?.status === 200) {
        dispatch(getLMSMateriSekolahMateriSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getLMSMateriSekolahMateriFailed(res?.data));
      }
    } catch (err) {
      errCallback && errCallback(err);
      dispatch(getLMSMateriSekolahMateriFailed(err));
    }
  };
};
