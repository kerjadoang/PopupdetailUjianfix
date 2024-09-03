import {
  GET_MATERIAL_TYPES_ACTION_TYPES,
  GET_MATERIAL_TYPES_DESTROY,
  GET_MATERIAL_TYPES_FAILED,
  GET_MATERIAL_TYPES_REQUEST,
  GET_MATERIAL_TYPES_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getMaterialTypesRequest = () => {
  return {
    type: GET_MATERIAL_TYPES_REQUEST,
  };
};

const getMaterialTypesSuccess = (data: any) => {
  return {
    type: GET_MATERIAL_TYPES_SUCCESS,
    payload: data,
  };
};

const getMaterialTypesFailed = (error: any) => {
  return {
    type: GET_MATERIAL_TYPES_FAILED,
    payload: error,
  };
};

export const getMaterialTypesDestroy = () => {
  return {
    type: GET_MATERIAL_TYPES_DESTROY,
  };
};

export const fetchMaterialTypes = (): any => {
  return async (
    dispatch: Dispatch<GET_MATERIAL_TYPES_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getMaterialTypesRequest());
    try {
      const res = await api.get(URL_PATH.get_materials_type);
      if (res?.status === 200) {
        dispatch(getMaterialTypesSuccess(res?.data));
      } else {
        dispatch(getMaterialTypesFailed(res?.data));
      }
    } catch (err) {
      dispatch(getMaterialTypesFailed(err));
    }
  };
};
