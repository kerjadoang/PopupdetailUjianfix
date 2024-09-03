import {
  GET_RECORD_TASK_DETAIL_ACTION_TYPES,
  GET_RECORD_TASK_DETAIL_DESTROY,
  GET_RECORD_TASK_DETAIL_FAILED,
  GET_RECORD_TASK_DETAIL_REQUEST,
  GET_RECORD_TASK_DETAIL_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getRecordTaskDetailRequest = () => {
  return {
    type: GET_RECORD_TASK_DETAIL_REQUEST,
  };
};

const getRecordTaskDetailSuccess = (data: any) => {
  return {
    type: GET_RECORD_TASK_DETAIL_SUCCESS,
    payload: data,
  };
};

const getRecordTaskDetailFailed = (error: any) => {
  return {
    type: GET_RECORD_TASK_DETAIL_FAILED,
    payload: error,
  };
};

export const getRecordTaskDetailDestroy = () => {
  return {
    type: GET_RECORD_TASK_DETAIL_DESTROY,
  };
};

export const fetchGetRecordTaskDetailHistory = (id: number): any => {
  return async (
    dispatch: Dispatch<GET_RECORD_TASK_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getRecordTaskDetailRequest());
    try {
      const res = await api.get(URL_PATH.get_task_detail(id));
      if (res?.status === 200) {
        dispatch(getRecordTaskDetailSuccess(res?.data));
      } else {
        dispatch(getRecordTaskDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(getRecordTaskDetailFailed(err));
    }
  };
};
