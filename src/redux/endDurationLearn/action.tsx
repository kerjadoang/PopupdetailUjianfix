import {
  END_DURATION_LEARN_ACTION_TYPES,
  END_DURATION_LEARN_DESTROY,
  END_DURATION_LEARN_FAILED,
  END_DURATION_LEARN_REQUEST,
  END_DURATION_LEARN_SUCCESS,
} from './type';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import api from '@api/index';

const endDurationLearnRequest = () => {
  return {
    type: END_DURATION_LEARN_REQUEST,
  };
};

const endDurationLearnSuccess = (data: any) => {
  return {
    type: END_DURATION_LEARN_SUCCESS,
    payload: data,
  };
};

const endDurationLearnFailed = (error: any) => {
  return {
    type: END_DURATION_LEARN_FAILED,
    payload: error,
  };
};

export const endDurationLearnDestroy = () => {
  return {
    type: END_DURATION_LEARN_DESTROY,
  };
};

export const fetchEndDurationLearn = (
  subject_id: number,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<END_DURATION_LEARN_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(endDurationLearnRequest());
    try {
      const res = await api.put(`lpt/v1/duration/end/${subject_id.toString()}`);

      if (res?.status === 200) {
        dispatch(endDurationLearnSuccess(res?.data));
        callback && callback();
      } else {
        dispatch(endDurationLearnFailed(res?.data));
        callback && callback();
      }
    } catch (err) {
      dispatch(endDurationLearnFailed(err));
      callback && callback();
    }
  };
};
