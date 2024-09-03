import {
  MAPEL_DM_REQUEST,
  MAPEL_DM_SUCCESS,
  MAPEL_DM_FAILED,
  MAPEL_DM_DESTROY,
  MAPEL_DM_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const mapelDetailMateriRequest = () => {
  return {
    type: MAPEL_DM_REQUEST,
  };
};

const mapelDetailMateriSuccess = (data: any) => {
  return {
    type: MAPEL_DM_SUCCESS,
    payload: {data},
  };
};

const mapelDetailMateriFailed = (error: any) => {
  return {
    type: MAPEL_DM_FAILED,
    payload: error,
  };
};

export const mapelDetailMateriDestroy = () => {
  return {
    type: MAPEL_DM_DESTROY,
  };
};

export const fetchMapelDetailMateri = (
  id: number,
  params?: any,
  callback?: any,
): any => {
  return async (dispatch: Dispatch<MAPEL_DM_ACTION_TYPES>): Promise<void> => {
    dispatch(mapelDetailMateriRequest());
    try {
      const url = params?.student?.id
        ? URL_PATH.get_subject_material_study_report(id)
        : URL_PATH.get_mapel_detail_materi(id);
      const res = await api.get(url, {params: params});
      if (res?.status === 200) {
        if (res?.data?.data?.subject?.icon_mobile) {
          const imgRes = await api.get(
            `/media/v1/image/${res?.data?.data?.subject?.icon_mobile}`,
          );

          let path_url = imgRes?.data?.data?.path_url;
          Object.assign(res?.data?.data?.subject, {path_url: path_url});
        }
        dispatch(mapelDetailMateriSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(mapelDetailMateriFailed(res?.data));
        callback && callback(res);
      }
    } catch (err) {
      dispatch(mapelDetailMateriFailed(err));
      callback && callback(err);
    }
  };
};
