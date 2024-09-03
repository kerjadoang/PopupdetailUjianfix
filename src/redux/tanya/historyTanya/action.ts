import {Dispatch} from 'redux';
import {
  GET_TERJAWAB_REQUEST,
  GET_TERJAWAB_SUCCESS,
  GET_TERJAWAB_FAILED,
  GET_TERJAWAB_DESTROY,
  IGetHistoryTanyaResponse,
  GET_TERJAWAB_ACTION_TYPES,
  GET_BELUM_DIJAWAB_REQUEST,
  GET_BELUM_DIJAWAB_SUCCESS,
  GET_BELUM_DIJAWAB_FAILED,
  GET_BELUM_DIJAWAB_DESTROY,
  GET_BELUM_DIJAWAB_ACTION_TYPES,
  GET_TIDAK_SESUAI_REQUEST,
  GET_TIDAK_SESUAI_SUCCESS,
  GET_TIDAK_SESUAI_FAILED,
  GET_TIDAK_SESUAI_DESTROY,
  GET_TIDAK_SESUAI_ACTION_TYPES,
  IGetHistoryTanyaParam,
} from './type';
import client from '@api/alternate';
import {URL_PATH} from '@constants/url';
import mediaProvider from '@services/media/provider';
import {AxiosResponse} from 'axios';

const getTerjawabRequest = () => {
  return {
    type: GET_TERJAWAB_REQUEST,
  };
};
const getTerjawabSuccess = (
  data: IGetHistoryTanyaResponse,
  nextPage: boolean,
  params: IGetHistoryTanyaParam,
) => {
  return {
    type: GET_TERJAWAB_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};
const getTerjawabFailed = (error: any) => {
  return {
    type: GET_TERJAWAB_FAILED,
    payload: error,
  };
};
export const getTerjawabDestroy = () => {
  return {
    type: GET_TERJAWAB_DESTROY,
  };
};

const getBelumDijawabRequest = () => {
  return {
    type: GET_BELUM_DIJAWAB_REQUEST,
  };
};
const getBelumDijawabSuccess = (
  data: IGetHistoryTanyaResponse,
  nextPage: boolean,
  params: IGetHistoryTanyaParam,
) => {
  return {
    type: GET_BELUM_DIJAWAB_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};
const getBelumDijawabFailed = (error: any) => {
  return {
    type: GET_BELUM_DIJAWAB_FAILED,
    payload: error,
  };
};
export const getBelumDijawabDestroy = () => {
  return {
    type: GET_BELUM_DIJAWAB_DESTROY,
  };
};

const getTidakSesuaiRequest = () => {
  return {
    type: GET_TIDAK_SESUAI_REQUEST,
  };
};
const getTidakSesuaiSuccess = (
  data: IGetHistoryTanyaResponse,
  nextPage: boolean,
  params: IGetHistoryTanyaParam,
) => {
  return {
    type: GET_TIDAK_SESUAI_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};
const getTidakSesuaiFailed = (error: any) => {
  return {
    type: GET_TIDAK_SESUAI_FAILED,
    payload: error,
  };
};
export const getTidakSesuaiDestroy = () => {
  return {
    type: GET_TIDAK_SESUAI_DESTROY,
  };
};

export const fetchHistoryTanyaTerjawab = (
  param: IGetHistoryTanyaParam,
): any => {
  return async (
    dispatch: Dispatch<GET_TERJAWAB_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getTerjawabRequest());
    try {
      const res: AxiosResponse<IGetHistoryTanyaResponse> = await client.get(
        URL_PATH.get_history_tanya('terjawab'),
        {
          params: {...param},
        },
      );
      const nextPage = res.data?.data ? res.data.data.length > 0 : false;

      const promises = res?.data?.data
        ? res.data.data.map?.(async (obj: any) => {
            if (obj?.image) {
              const imgRes = await mediaProvider.getImage(obj.image);
              obj.path_url = imgRes?.data?.path_url;
            }
          })
        : null;

      if (promises) {
        await Promise.all(promises);
      }

      dispatch(getTerjawabSuccess(res.data, nextPage, param));
    } catch (err) {
      dispatch(getTerjawabFailed(err));
    }
  };
};

export const fetchHistoryTanyaBelumDijawab = (
  param: IGetHistoryTanyaParam,
): any => {
  return async (
    dispatch: Dispatch<GET_BELUM_DIJAWAB_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getBelumDijawabRequest());
    try {
      const res = await client.get(
        URL_PATH.get_history_tanya('belum_dijawab'),
        {
          params: {...param},
        },
      );
      const nextPage = res.data?.data ? res.data.data.length > 0 : false;

      const promises = res?.data?.data
        ? res.data.data.map?.(async (obj: any) => {
            if (obj?.image) {
              const imgRes = await mediaProvider.getImage(obj.image);
              obj.path_url = imgRes?.data?.path_url;
            }
          })
        : null;

      if (promises) {
        await Promise.all(promises);
      }

      dispatch(getBelumDijawabSuccess(res.data, nextPage, param));
    } catch (err) {
      dispatch(getBelumDijawabFailed(err));
    }
  };
};

export const fetchHistoryTanyaTidakSesuai = (
  param: IGetHistoryTanyaParam,
): any => {
  return async (
    dispatch: Dispatch<GET_TIDAK_SESUAI_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getTidakSesuaiRequest());
    try {
      const res = await client.get(URL_PATH.get_history_tanya('tidak_sesuai'), {
        params: {...param},
      });
      const nextPage = res.data?.data ? res.data.data.length > 0 : false;

      const promises = res?.data?.data
        ? res.data.data.map?.(async (obj: any) => {
            if (obj?.image) {
              const imgRes = await mediaProvider.getImage(obj.image);
              obj.path_url = imgRes?.data?.path_url;
            }
          })
        : null;

      if (promises) {
        await Promise.all(promises);
      }

      dispatch(getTidakSesuaiSuccess(res.data, nextPage, param));
    } catch (err) {
      dispatch(getTidakSesuaiFailed(err));
    }
  };
};
