import {
  GET_CLASS_BY_DEGREE_ACTION_TYPES,
  GET_CLASS_BY_DEGREE_DESTROY,
  GET_CLASS_BY_DEGREE_FAILED,
  GET_CLASS_BY_DEGREE_REQUEST,
  GET_CLASS_BY_DEGREE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const getClassByDegreeRequest = () => {
  return {
    type: GET_CLASS_BY_DEGREE_REQUEST,
  };
};

const getClassByDegreeSuccess = (data: any) => {
  return {
    type: GET_CLASS_BY_DEGREE_SUCCESS,
    payload: data,
  };
};

const getClassByDegreeFailed = (error: any) => {
  return {
    type: GET_CLASS_BY_DEGREE_FAILED,
    payload: error,
  };
};

export const getClassByDegreeDestroy = () => {
  return {
    type: GET_CLASS_BY_DEGREE_DESTROY,
  };
};

export const fetchClassByDegree = (degree_id: any): any => {
  return async (
    dispatch: Dispatch<GET_CLASS_BY_DEGREE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getClassByDegreeRequest());
    try {
      showLoading();
      const res = await api.get(URL_PATH.get_class_by_degree(degree_id));
      if (res?.status === 200) {
        dispatch(getClassByDegreeSuccess(res?.data));
      } else {
        dispatch(getClassByDegreeFailed(res?.data));
      }
    } catch (err) {
      dispatch(getClassByDegreeFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
