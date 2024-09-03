import {
  GIVE_ESSAY_SCORE_REQUEST,
  GIVE_ESSAY_SCORE_SUCCESS,
  GIVE_ESSAY_SCORE_FAILED,
  GIVE_ESSAY_SCORE_DESTROY,
  GIVE_ESSAY_SCORE_ACTION_TYPES,
  _IPayloadEsayScore,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const sendEssayScoreRequest = () => {
  return {
    type: GIVE_ESSAY_SCORE_REQUEST,
  };
};

const sendEssayScoreSuccess = (data: any) => {
  return {
    type: GIVE_ESSAY_SCORE_SUCCESS,
    payload: {data},
  };
};

const sendEssayScoreFailed = (error: any) => {
  return {
    type: GIVE_ESSAY_SCORE_FAILED,
    payload: error,
  };
};

export const sendEssayScoreDestroy = () => {
  return {
    type: GIVE_ESSAY_SCORE_DESTROY,
  };
};

export const sendEssayScore = (
  order: any,
  student_exam_id: any,
  payload: _IPayloadEsayScore,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<GIVE_ESSAY_SCORE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(sendEssayScoreRequest());
    try {
      const res = await api.post(
        URL_PATH.give_essay_score(order, student_exam_id),
        payload,
      );
      if (res?.status === 200) {
        dispatch(sendEssayScoreSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(sendEssayScoreFailed(res?.data));
      }
    } catch (err) {
      dispatch(sendEssayScoreFailed(err));
    }
  };
};
