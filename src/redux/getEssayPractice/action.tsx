import api from '@api/index';
import {Dispatch} from 'redux';
import {
  ESSAY_PRACTICE_ACTION_TYPES,
  ESSAY_PRACTICE_DESTROY,
  ESSAY_PRACTICE_FAILED,
  ESSAY_PRACTICE_REQUEST,
  ESSAY_PRACTICE_SUCCESS,
} from './type';

const essayPracticeRequest = () => {
  return {
    type: ESSAY_PRACTICE_REQUEST,
  };
};

const essayPracticeSuccess = (data: any) => {
  return {
    type: ESSAY_PRACTICE_SUCCESS,
    payload: data,
  };
};

const essayPracticeFailed = (error: any) => {
  return {
    type: ESSAY_PRACTICE_FAILED,
    payload: error,
  };
};

export const essayPracticeDestroy = () => {
  return {
    type: ESSAY_PRACTICE_DESTROY,
  };
};

export const fetchEssayPractice = (
  chapterId: any,
  question_service_type_id: any,
): any => {
  return async (
    dispatch: Dispatch<ESSAY_PRACTICE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(essayPracticeRequest());
    try {
      // will be replace if login success implements
      const res = await api.get(
        `lpt/v1/practice/go_practice/question/${chapterId}?question_service_type_id=${question_service_type_id}`,
        {},
      );
      if (res?.status === 200) {
        const data = res?.data || [];

        dispatch(essayPracticeSuccess(data));
      } else {
        dispatch(essayPracticeFailed(res?.data));
      }
    } catch (err) {
      dispatch(essayPracticeFailed(err));
    }
  };
};
