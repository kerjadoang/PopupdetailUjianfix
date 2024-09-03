import {
  GET_ALL_AKM_TYPE_PACKAGE_ACTION_TYPES,
  GET_ALL_AKM_TYPE_PACKAGE_DESTROY,
  GET_ALL_AKM_TYPE_PACKAGE_FAILED,
  GET_ALL_AKM_TYPE_PACKAGE_REQUEST,
  GET_ALL_AKM_TYPE_PACKAGE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getAllAkmTypePackageRequest = () => {
  return {
    type: GET_ALL_AKM_TYPE_PACKAGE_REQUEST,
  };
};

const getAllAkmTypePackageSuccess = (data: any) => {
  return {
    type: GET_ALL_AKM_TYPE_PACKAGE_SUCCESS,
    payload: data,
  };
};

const getAllAkmTypeChapterFailed = (error: any) => {
  return {
    type: GET_ALL_AKM_TYPE_PACKAGE_FAILED,
    payload: error,
  };
};

export const getAllAkmChapterDestroy = () => {
  return {
    type: GET_ALL_AKM_TYPE_PACKAGE_DESTROY,
  };
};

export const fetchGetAllAkmTypePackage = (
  _question_package_service_id: any,
  _question_type_id: any,
  callback?: any,
  errCallback?: any,
): any => {
  return async (
    dispatch: Dispatch<GET_ALL_AKM_TYPE_PACKAGE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllAkmTypePackageRequest());
    try {
      const res = await api.get(
        URL_PATH.get_all_akm_type_package(
          _question_package_service_id,
          _question_type_id,
        ),
      );

      if (res?.status === 200) {
        dispatch(getAllAkmTypePackageSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getAllAkmTypeChapterFailed(res?.data));
      }
    } catch (err) {
      errCallback && errCallback(err);
      dispatch(getAllAkmTypeChapterFailed(err));
    }
  };
};
