import {
  GET_LMS_MATERI_SEKOLAH_BAB_ACTION_TYPES,
  GET_LMS_MATERI_SEKOLAH_BAB_DESTROY,
  GET_LMS_MATERI_SEKOLAH_BAB_FAILED,
  GET_LMS_MATERI_SEKOLAH_BAB_REQUEST,
  GET_LMS_MATERI_SEKOLAH_BAB_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getLMSMateriSekolahBabRequest = () => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_BAB_REQUEST,
  };
};

const getLMSMateriSekolahBabSuccess = (data: any) => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_BAB_SUCCESS,
    payload: data,
  };
};

const getLMSMateriSekolahBabFailed = (error: any) => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_BAB_FAILED,
    payload: error,
  };
};

export const getLMSMateriSekolahBabDestroy = () => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_BAB_DESTROY,
  };
};

export const fetchGetLMSMateriSekolahBab = (
  subject_id: string,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_LMS_MATERI_SEKOLAH_BAB_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getLMSMateriSekolahBabRequest());
    try {
      const res = await api.get(
        URL_PATH.get_lms_materi_sekolah_bab(subject_id),
      );

      if (res?.status === 200) {
        dispatch(getLMSMateriSekolahBabSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getLMSMateriSekolahBabFailed(res?.data));
      }
    } catch (err) {
      dispatch(getLMSMateriSekolahBabFailed(err));
    }
  };
};
