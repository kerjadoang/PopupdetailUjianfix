import {
  SCORING_EXAM_REQUEST,
  SCORING_EXAM_SUCCESS,
  SCORING_EXAM_FAILED,
  SCORING_EXAM_DESTROY,
  SCORING_EXAM_ACTION_TYPES,
} from './type';
import {Keys} from '@constants/keys';
import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_PATH} from '@constants/url';

const scoringExamRequest = () => {
  return {
    type: SCORING_EXAM_REQUEST,
  };
};

const scoringExamSuccess = (data: any) => {
  return {
    type: SCORING_EXAM_SUCCESS,
    payload: {data},
  };
};

const scoringExamFailed = (error: any) => {
  return {
    type: SCORING_EXAM_FAILED,
    payload: error,
  };
};

export const scoringExamDestroy = () => {
  return {
    type: SCORING_EXAM_DESTROY,
  };
};

export const fetchScoringExam = (student_exam_id: any) => {
  return async (
    dispatch: Dispatch<SCORING_EXAM_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(scoringExamRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await api.get(
        `${URL_PATH.scoring_exam_student(student_exam_id)}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (res?.status === 200) {
        dispatch(scoringExamSuccess(res?.data));
      } else {
        dispatch(scoringExamFailed(res?.data));
      }
    } catch (err) {
      dispatch(scoringExamFailed(err));
    }
  };
};
