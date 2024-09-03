import {
  ROMBEL_CLASS_LIST_ACTION_TYPES,
  ROMBEL_CLASS_LIST_DESTROY,
  ROMBEL_CLASS_LIST_FAILED,
  ROMBEL_CLASS_LIST_REQUEST,
  ROMBEL_CLASS_LIST_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const getRombelClassListRequest = () => {
  return {
    type: ROMBEL_CLASS_LIST_REQUEST,
  };
};

const getRombelClassListSuccess = (data: any) => {
  return {
    type: ROMBEL_CLASS_LIST_SUCCESS,
    payload: data,
  };
};

const getRombelClassListFailed = (error: any) => {
  return {
    type: ROMBEL_CLASS_LIST_FAILED,
    payload: error,
  };
};

export const getRombelClassListDestroy = () => {
  return {
    type: ROMBEL_CLASS_LIST_DESTROY,
  };
};

export const fetchRombelClassList = (classId: any, schoolId: any): any => {
  return async (
    dispatch: Dispatch<ROMBEL_CLASS_LIST_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getRombelClassListRequest());
    showLoading();
    try {
      const res = await api.get(URL_PATH.rombel_class_list(classId, schoolId));
      if (res?.status === 200) {
        dispatch(getRombelClassListSuccess(res?.data));
      } else {
        dispatch(getRombelClassListFailed(res?.data));
      }
    } catch (err) {
      dispatch(getRombelClassListFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
