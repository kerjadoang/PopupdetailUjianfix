import {Dispatch} from 'redux';
import {AxiosResponse} from 'axios';

import client from '@api/index';

import {
  GET_GURU_PR_PROJEK_TUGAS_ACTION_TYPES,
  GET_PERLU_DIPERIKSA_REQUEST,
  GET_PERLU_DIPERIKSA_SUCCESS,
  GET_PERLU_DIPERIKSA_FAILED,
  GET_PERLU_DIPERIKSA_DESTROY,
  GET_DIJADWALKAN_REQUEST,
  GET_DIJADWALKAN_SUCCESS,
  GET_DIJADWALKAN_FAILED,
  GET_DIJADWALKAN_DESTROY,
} from './type';
import {dismissLoading, showLoading} from '@constants/functional';

const getPerluDiperiksaRequest = () => {
  return {
    type: GET_PERLU_DIPERIKSA_REQUEST,
  };
};

const getPerluDiperiksaSuccess = (
  data: any,
  nextPage: boolean,
  params: any,
) => {
  return {
    type: GET_PERLU_DIPERIKSA_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getPerluDiperiksaFailed = (error: any) => {
  return {
    type: GET_PERLU_DIPERIKSA_FAILED,
    payload: error,
  };
};

export const getPerluDiperiksaDestroy = () => {
  return {
    type: GET_PERLU_DIPERIKSA_DESTROY,
  };
};

export const fetchPerluDiperiksa = (param: any): any => {
  return async (
    dispatch: Dispatch<GET_GURU_PR_PROJEK_TUGAS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getPerluDiperiksaRequest());

    try {
      showLoading();
      const res: AxiosResponse = await client.post(
        '/lms/v1/teacher/task/home/checked',
        {...param, class_id: [], rombel_class_school_id: param?.class_id},
      );
      const nextPage = res.data.data?.list?.length > 0 ? true : false;

      dispatch(
        getPerluDiperiksaSuccess(res.data.data?.list ?? [], nextPage, param),
      );
    } catch (error) {
      dispatch(getPerluDiperiksaFailed(error));
    } finally {
      dismissLoading();
    }
  };
};

const getDijadwalkanRequest = () => {
  return {
    type: GET_DIJADWALKAN_REQUEST,
  };
};

const getDijadwalkanSuccess = (data: any, nextPage: boolean, params: any) => {
  return {
    type: GET_DIJADWALKAN_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getDijadwalkanFailed = (error: any) => {
  return {
    type: GET_DIJADWALKAN_FAILED,
    payload: error,
  };
};

export const getDijadwalkanDestroy = () => {
  return {
    type: GET_DIJADWALKAN_DESTROY,
  };
};

export const fetchDijadwalkan = (param: any): any => {
  return async (
    dispatch: Dispatch<GET_GURU_PR_PROJEK_TUGAS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getDijadwalkanRequest());

    try {
      const res: AxiosResponse = await client.post(
        '/lms/v1/teacher/task/home/schedule',
        {...param, class_id: [], rombel_class_school_id: param?.class_id},
      );

      const nextPage = res.data.data?.list?.length > 0 ? true : false;

      dispatch(
        getDijadwalkanSuccess(res.data.data?.list ?? [], nextPage, param),
      );
    } catch (error) {
      dispatch(getDijadwalkanFailed(error));
    }
  };
};
