import {
  GET_LMS_MATERI_SEKOLAH_ACTION_TYPES,
  GET_LMS_MATERI_SEKOLAH_DESTROY,
  GET_LMS_MATERI_SEKOLAH_FAILED,
  GET_LMS_MATERI_SEKOLAH_REQUEST,
  GET_LMS_MATERI_SEKOLAH_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getLMSMateriSekolahRequest = () => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_REQUEST,
  };
};

const getLMSMateriSekolahSuccess = (data: any) => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_SUCCESS,
    payload: data,
  };
};

const getLMSMateriSekolahFailed = (error: any) => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_FAILED,
    payload: error,
  };
};

export const getLMSMateriSekolahDestroy = () => {
  return {
    type: GET_LMS_MATERI_SEKOLAH_DESTROY,
  };
};

export const fetchGetLMSMateriSekolah = (callback?: any): any => {
  return async (
    dispatch: Dispatch<GET_LMS_MATERI_SEKOLAH_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getLMSMateriSekolahRequest());
    try {
      const res = await api.get(URL_PATH.get_lms_materi_sekolah());

      if (res?.status === 200) {
        const data = res?.data || [];
        // using Promise.all() for fetch API paralel
        const promises = data?.data?.map(async (obj: any) => {
          if (obj?.icon_mobile) {
            const imgRes = await api.get(`/media/v1/image/${obj?.icon_mobile}`);
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.icon_path_url = imgRes?.data?.data?.path_url;
              obj.icon_path_id = imgRes?.data?.data?.ID;
            }
          }
        });
        await Promise.all(promises);
        dispatch(getLMSMateriSekolahSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getLMSMateriSekolahFailed(res?.data));
      }
    } catch (err) {
      dispatch(getLMSMateriSekolahFailed(err));
    }
  };
};
