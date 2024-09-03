import api from '@api/index';
import {
  UPDATE_READ_ACTIVITY_ACTION_TYPES,
  UPDATE_READ_ACTIVITY_DESTROY,
  UPDATE_READ_ACTIVITY_FAILED,
  UPDATE_READ_ACTIVITY_REQUEST,
  UPDATE_READ_ACTIVITY_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import Config from 'react-native-config';

const updateReadActivityRequest = () => {
  return {
    type: UPDATE_READ_ACTIVITY_REQUEST,
  };
};

const updateReadActivitySuccess = (data: any) => {
  return {
    type: UPDATE_READ_ACTIVITY_SUCCESS,
    payload: data,
  };
};

const updateReadActivityFailed = (error: any) => {
  return {
    type: UPDATE_READ_ACTIVITY_FAILED,
    payload: error,
  };
};

export const updateReadActivityDestroy = () => {
  return {
    type: UPDATE_READ_ACTIVITY_DESTROY,
  };
};

export const fetchUpdateReadActivity = (uuid: string, callback?: any): any => {
  return async (
    dispatch: Dispatch<UPDATE_READ_ACTIVITY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(updateReadActivityRequest());
    try {
      const res = await api.put(
        `${Config.BASEURL}/notification/v1/aktivitas/${uuid}`,
      );
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(updateReadActivitySuccess(res?.data));
      } else {
        dispatch(updateReadActivityFailed(res?.data));
      }
    } catch (err) {
      dispatch(updateReadActivityFailed(err));
    }
  };
};
