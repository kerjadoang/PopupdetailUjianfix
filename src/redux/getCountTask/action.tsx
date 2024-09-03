import {
  GET_COUNT_TASK_REQUEST,
  GET_COUNT_TASK_SUCCESS,
  GET_COUNT_TASK_FAILED,
  GET_COUNT_TASK_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {GenerateUUID} from '@constants/functional';
import api from '@api/index';

const getCountTaskRequest = () => {
  return {
    type: GET_COUNT_TASK_REQUEST,
  };
};

const getCountTaskSuccess = (data: any) => {
  return {
    type: GET_COUNT_TASK_SUCCESS,
    payload: data,
  };
};

const getCountTaskFailed = (error: any) => {
  return {
    type: GET_COUNT_TASK_FAILED,
    payload: error,
  };
};

export const fetchGetCountTask = (token?: any) => {
  return async (
    dispatch: Dispatch<GET_COUNT_TASK_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getCountTaskRequest());
    try {
      // will be replace if login success implements
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');
      const requestId = GenerateUUID();
      const res = await api.get('/lms/v1/task/count/not-reviewed', {
        headers: {
          Authorization: `Bearer ${token || tokenParse}`,
          'Request-Id': requestId,
        },
      });

      if (res?.status === 200) {
        dispatch(getCountTaskSuccess(res?.data));
      } else {
        dispatch(getCountTaskFailed(res?.data));
      }
    } catch (err) {
      dispatch(getCountTaskFailed(err));
    }
  };
};
