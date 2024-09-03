import {Dispatch} from 'redux';
import {AxiosResponse} from 'axios';

import client from '@api/index';

import {
  GET_PR_PROJEK_TUGAS_BELUM_DIKERJAKAN_ACTION_TYPES,
  GET_SEARCH,
  GET_BELUM_DIKERJAKAN_REQUEST,
  GET_BELUM_DIKERJAKAN_SUCCESS,
  GET_BELUM_DIKERJAKAN_FAILED,
  GET_BELUM_DIKERJAKAN_DESTROY,
  GET_RIWAYAT_REQUEST,
  GET_RIWAYAT_SUCCESS,
  GET_RIWAYAT_FAILED,
  GET_RIWAYAT_DESTROY,
} from './type';
import {dismissLoading, showLoading} from '@constants/functional';

const getSearch = (payload: string) => {
  return {
    type: GET_SEARCH,
    payload,
  };
};

export const setGetSearch = (payload: string): any => {
  return async (
    dispatch: Dispatch<GET_PR_PROJEK_TUGAS_BELUM_DIKERJAKAN_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getSearch(payload));
  };
};

const getBelumDikerjakanRequest = () => {
  return {
    type: GET_BELUM_DIKERJAKAN_REQUEST,
  };
};

const getBelumDikerjakanSuccess = (
  data: any,
  nextPage: boolean,
  params: any,
) => {
  return {
    type: GET_BELUM_DIKERJAKAN_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getBelumDikerjakanFailed = (error: any) => {
  return {
    type: GET_BELUM_DIKERJAKAN_FAILED,
    payload: error,
  };
};

export const getBelumDikerjakanDestroy = () => {
  return {
    type: GET_BELUM_DIKERJAKAN_DESTROY,
  };
};

export const fetchBelumDikerjakan = (param: any): any => {
  return async (
    dispatch: Dispatch<GET_PR_PROJEK_TUGAS_BELUM_DIKERJAKAN_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getBelumDikerjakanRequest());

    try {
      showLoading();
      const res: AxiosResponse = await client.post(
        '/lms/v1/student/task/home/dijadwalkan',
        param,
      );

      const nextPage = res.data.data?.list?.length > 0 ? true : false;

      dispatch(
        getBelumDikerjakanSuccess(res.data.data?.list ?? [], nextPage, param),
      );
    } catch (error) {
      dispatch(getBelumDikerjakanFailed(error));
    } finally {
      dismissLoading();
    }
  };
};

const getRiwayatRequest = () => {
  return {
    type: GET_RIWAYAT_REQUEST,
  };
};

const getRiwayatSuccess = (data: any, nextPage: boolean, params: any) => {
  return {
    type: GET_RIWAYAT_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getRiwayatFailed = (error: any) => {
  return {
    type: GET_RIWAYAT_FAILED,
    payload: error,
  };
};

export const getRiwayatDestroy = () => {
  return {
    type: GET_RIWAYAT_DESTROY,
  };
};

export const fetchRiwayat = (param: any): any => {
  return async (
    dispatch: Dispatch<GET_PR_PROJEK_TUGAS_BELUM_DIKERJAKAN_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getRiwayatRequest());

    try {
      showLoading();
      const res: AxiosResponse = await client.post(
        '/lms/v1/student/task/home/history',
        param,
      );

      const nextPage = res.data.data?.list?.length > 0 ? true : false;
      dispatch(getRiwayatSuccess(res.data.data?.list ?? [], nextPage, param));
    } catch (error) {
      dispatch(getRiwayatFailed(error));
    } finally {
      dismissLoading();
    }
  };
};
