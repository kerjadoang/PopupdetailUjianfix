import {
  MAPEL_REQUEST,
  MAPEL_SUCCESS,
  MAPEL_FAILED,
  MAPEL_DESTROY,
  MAPEL_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const mapelRequest = () => {
  return {
    type: MAPEL_REQUEST,
  };
};

const mapelSuccess = (data: any) => {
  return {
    type: MAPEL_SUCCESS,
    payload: {data},
  };
};

const mapelFailed = (error: any) => {
  return {
    type: MAPEL_FAILED,
    payload: error,
  };
};

export const mapelDestroy = () => {
  return {
    type: MAPEL_DESTROY,
  };
};

export const fetchMapel = (id: number) => {
  return async (dispatch: Dispatch<MAPEL_ACTION_TYPES>): Promise<void> => {
    dispatch(mapelRequest());
    try {
      showLoading();
      const res = await api.get(URL_PATH.get_mapel_by_class(id));
      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        const promises = data?.data?.map(async (obj: any) => {
          if (obj?.icon_mobile) {
            const imgRes = await api.get(`/media/v1/image/${obj?.icon_mobile}`);

            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);
        dispatch(mapelSuccess(res?.data));
      } else {
        dispatch(mapelFailed(res?.data));
      }
    } catch (err) {
      dispatch(mapelFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
