import {
  GET_LMS_LIST_UJIAN_ACTION_TYPES,
  GET_LMS_LIST_UJIAN_DESTROY,
  GET_LMS_LIST_UJIAN_FAILED,
  GET_LMS_LIST_UJIAN_REQUEST,
  GET_LMS_LIST_UJIAN_RESET,
  GET_LMS_LIST_UJIAN_RIWAYAT_ACTION_TYPES,
  GET_LMS_LIST_UJIAN_RIWAYAT_DESTROY,
  GET_LMS_LIST_UJIAN_RIWAYAT_FAILED,
  GET_LMS_LIST_UJIAN_RIWAYAT_REQUEST,
  GET_LMS_LIST_UJIAN_RIWAYAT_SUCCESS,
  GET_LMS_LIST_UJIAN_SUCCESS,
  _IPayloadLMSListUjian,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getLMSListUjianRequest = () => {
  return {
    type: GET_LMS_LIST_UJIAN_REQUEST,
  };
};

const getLMSListUjianSuccess = (
  data: any,
  nextPage: boolean,
  params: any,
  resetList?: boolean,
) => {
  return {
    type: GET_LMS_LIST_UJIAN_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
      resetList,
    },
  };
};

const getLMSListUjianFailed = (error: any) => {
  return {
    type: GET_LMS_LIST_UJIAN_FAILED,
    payload: error,
  };
};

export const getLMSListUjianDestroy = () => {
  return {
    type: GET_LMS_LIST_UJIAN_DESTROY,
  };
};
export const getLMSListUjianReset = () => {
  return {
    type: GET_LMS_LIST_UJIAN_RESET,
  };
};

export const fetchGetLMSListUjian = (
  payload: _IPayloadLMSListUjian,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_LMS_LIST_UJIAN_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getLMSListUjianRequest());
    try {
      const res = await api.post(URL_PATH.get_lms_list_ujian(), payload);
      if (res?.status === 200) {
        const nextPage = res?.data?.data.length > 0 ? true : false;
        dispatch(
          getLMSListUjianSuccess(
            res?.data?.data,
            nextPage,
            payload,
            payload.resetList,
          ),
        );
        callback && callback(res);
      } else {
        dispatch(getLMSListUjianFailed(res?.data));
      }
    } catch (err) {
      dispatch(getLMSListUjianFailed(err));
    }
  };
};

const getLMSListUjianRiwayatRequest = () => {
  return {
    type: GET_LMS_LIST_UJIAN_RIWAYAT_REQUEST,
  };
};

const getLMSListUjianRiwayatSuccess = (
  data: any,
  nextPage: boolean,
  params: any,
  resetList?: boolean,
) => {
  return {
    type: GET_LMS_LIST_UJIAN_RIWAYAT_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
      resetList,
    },
  };
};

const getLMSListUjianRiwayatFailed = (error: any) => {
  return {
    type: GET_LMS_LIST_UJIAN_RIWAYAT_FAILED,
    payload: error,
  };
};

export const getLMSListUjianRiwayatDestroy = () => {
  return {
    type: GET_LMS_LIST_UJIAN_RIWAYAT_DESTROY,
  };
};

export const fetchgetLMSListUjianRiwayat = (
  payload: _IPayloadLMSListUjian,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_LMS_LIST_UJIAN_RIWAYAT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getLMSListUjianRiwayatRequest());
    try {
      const res = await api.post(URL_PATH.get_lms_list_ujian(), payload);
      if (res?.status === 200) {
        const nextPage = res?.data?.data.length > 0 ? true : false;
        dispatch(
          getLMSListUjianRiwayatSuccess(
            res?.data?.data,
            nextPage,
            payload,
            payload.resetList,
          ),
        );
        callback && callback(res);
      } else {
        dispatch(getLMSListUjianRiwayatFailed(res?.data));
      }
    } catch (err) {
      dispatch(getLMSListUjianRiwayatFailed(err));
    }
  };
};
