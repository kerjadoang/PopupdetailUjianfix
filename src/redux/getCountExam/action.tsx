import {
  GET_COUNT_EXAM_REQUEST,
  GET_COUNT_EXAM_SUCCESS,
  GET_COUNT_EXAM_FAILED,
  GET_COUNT_EXAM_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {GenerateUUID} from '@constants/functional';
import api from '@api/index';

const getCountExamRequest = () => {
  return {
    type: GET_COUNT_EXAM_REQUEST,
  };
};

const getCountExamSuccess = (data: any) => {
  return {
    type: GET_COUNT_EXAM_SUCCESS,
    payload: data,
  };
};

const getCountExamFailed = (error: any) => {
  return {
    type: GET_COUNT_EXAM_FAILED,
    payload: error,
  };
};

export const fetchGetCountExam = (token?: any) => {
  return async (
    dispatch: Dispatch<GET_COUNT_EXAM_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getCountExamRequest());
    try {
      // will be replace if login success implements
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');
      const requestId = GenerateUUID();
      const res = await api.get('/lms/v1/count/exam/not-reviewed', {
        headers: {
          Authorization: `Bearer ${token || tokenParse}`,
          'Request-Id': requestId,
        },
      });

      if (res?.status === 200) {
        dispatch(getCountExamSuccess(res?.data));
      } else {
        dispatch(getCountExamFailed(res?.data));
      }
    } catch (err) {
      dispatch(getCountExamFailed(err));
    }
  };
};
