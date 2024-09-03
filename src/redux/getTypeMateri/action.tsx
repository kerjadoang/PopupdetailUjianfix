import {
  TYPE_MATERI_REQUEST,
  TYPE_MATERI_SUCCESS,
  TYPE_MATERI_FAILED,
  TYPE_MATERI_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const TypeMateriRequest = () => {
  return {
    type: TYPE_MATERI_REQUEST,
  };
};

const TypeMateriSuccess = (data: any) => {
  return {
    type: TYPE_MATERI_SUCCESS,
    payload: {data},
  };
};

const TypeMateriFailed = (error: any) => {
  return {
    type: TYPE_MATERI_FAILED,
    payload: error,
  };
};

export const fetchTypeMateri = (id: number) => {
  return async (
    dispatch: Dispatch<TYPE_MATERI_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(TypeMateriRequest());
    try {
      const res = await api.get(URL_PATH.get_type_materi_sekolah(id));
      if (res?.status === 200) {
        dispatch(TypeMateriSuccess(res?.data));
      } else {
        dispatch(TypeMateriFailed(res?.data));
      }
    } catch (err) {
      dispatch(TypeMateriFailed(err));
    }
  };
};
