import {
  SAVE_ANSWER,
  SAVE_ANSWER_DESTROY,
  GET_ANSWERS,
  SaveAnswerType,
} from './type';

export const saveAnswerAction = (data: SaveAnswerType) => {
  return {
    type: SAVE_ANSWER,
    payload: data,
  };
};

export const getAnswersAction = () => {
  return {
    type: GET_ANSWERS,
  };
};

export const destroySaveAnswerAction = () => {
  return {
    type: SAVE_ANSWER_DESTROY,
  };
};
