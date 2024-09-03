import {
  START_DURATION_LEARN_ACTION_TYPES,
  START_DURATION_LEARN_DESTROY,
  START_DURATION_LEARN_FAILED,
  START_DURATION_LEARN_SUCCESS,
  START_DURATION_LEARN_REQUEST,
} from './type';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import api from '@api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {SubjectType} from '@constants/subjectType';

const startDurationLearnRequest = () => {
  return {
    type: START_DURATION_LEARN_REQUEST,
  };
};

const startDurationLearnSuccess = (data: any) => {
  return {
    type: START_DURATION_LEARN_SUCCESS,
    payload: data,
  };
};

const startDurationLearnFailed = (error: any) => {
  return {
    type: START_DURATION_LEARN_FAILED,
    payload: error,
  };
};

export const startDurationLearnDestroy = () => {
  return {
    type: START_DURATION_LEARN_DESTROY,
  };
};

export const fetchStartDurationLearn = (
  reqBody: any,
  contentType?: any,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<START_DURATION_LEARN_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(startDurationLearnRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.post(
        `lpt/v1/duration/start/${
          contentType === SubjectType?.LMS?.MateriSekolah
            ? 'SCHOOL_MATERIAL'
            : 'KP_REGULER'
        }`,
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(startDurationLearnSuccess(res?.data));
      } else {
        dispatch(startDurationLearnFailed(res?.data));
      }
    } catch (err) {
      dispatch(startDurationLearnFailed(err));
    }
  };
};
