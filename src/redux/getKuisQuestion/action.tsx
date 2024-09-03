import {
  GET_KUIS_QUESTION_ACTION_TYPES,
  GET_KUIS_QUESTION_DESTROY,
  GET_KUIS_QUESTION_FAILED,
  GET_KUIS_QUESTION_REQUEST,
  GET_KUIS_QUESTION_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getKuisQuestionRequest = () => {
  return {
    type: GET_KUIS_QUESTION_REQUEST,
  };
};

const getKuisQuestionSuccess = (data: any) => {
  return {
    type: GET_KUIS_QUESTION_SUCCESS,
    payload: data,
  };
};

const getKuisQuestionFailed = (error: any) => {
  return {
    type: GET_KUIS_QUESTION_FAILED,
    payload: error,
  };
};

export const getKuisQuestionDestroy = () => {
  return {
    type: GET_KUIS_QUESTION_DESTROY,
  };
};

export const fetchGetKuisQuestion = (question_package_id: string): any => {
  return async (
    dispatch: Dispatch<GET_KUIS_QUESTION_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getKuisQuestionRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(
        URL_PATH.get_kuis_question(question_package_id),
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
            'Device-id': '',
          },
        },
      );
      if (res?.status === 200) {
        dispatch(getKuisQuestionSuccess(res?.data));
      } else {
        dispatch(getKuisQuestionFailed(res?.data));
      }
    } catch (err) {
      dispatch(getKuisQuestionFailed(err));
    }
  };
};
