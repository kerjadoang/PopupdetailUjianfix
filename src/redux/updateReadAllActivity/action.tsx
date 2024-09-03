import {
  UPDATE_READ_ALL_ACTIVITY_ACTION_TYPES,
  UPDATE_READ_ALL_ACTIVITY_DESTROY,
  UPDATE_READ_ALL_ACTIVITY_FAILED,
  UPDATE_READ_ALL_ACTIVITY_REQUEST,
  UPDATE_READ_ALL_ACTIVITY_SUCCESS,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';

const updateReadAllActivityRequest = () => {
  return {
    type: UPDATE_READ_ALL_ACTIVITY_REQUEST,
  };
};

const updateReadAllActivitySuccess = (data: any) => {
  return {
    type: UPDATE_READ_ALL_ACTIVITY_SUCCESS,
    payload: data,
  };
};

const updateReadAllActivityFailed = (error: any) => {
  return {
    type: UPDATE_READ_ALL_ACTIVITY_FAILED,
    payload: error,
  };
};

export const updateReadAllActivityDestroy = () => {
  return {
    type: UPDATE_READ_ALL_ACTIVITY_DESTROY,
  };
};

export const fetchUpdateReadAllActivity = (callback?: any) => {
  return async (
    dispatch: Dispatch<UPDATE_READ_ALL_ACTIVITY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(updateReadAllActivityRequest());
    try {
      const res = await api.get('notification/v1/aktivitas/readall');
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(updateReadAllActivitySuccess(res?.data));
      } else {
        dispatch(updateReadAllActivityFailed(res?.data));
      }
    } catch (err) {
      dispatch(updateReadAllActivityFailed(err));
    }
  };
};
