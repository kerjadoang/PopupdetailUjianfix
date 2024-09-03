const BASE_NAME = 'ANSWER';
export const SAVE_ANSWER = `${BASE_NAME}_SAVE`;
export const SAVE_ANSWER_DESTROY = `${BASE_NAME}_DESTROY`;
export const GET_ANSWERS = `${BASE_NAME}_GET`;

export type SaveAnswerType = {
  questionId: string;
  userAnswer: string;
  question?: string;
  questionOptionsId?: string;
  status?: string;
};

export type SaveAnswerState = {
  data: SaveAnswerType[];
};

interface SaveAnswerAction {
  type: typeof SAVE_ANSWER;
  payload: SaveAnswerType;
}

interface GetAnswersAction {
  type: typeof GET_ANSWERS;
}

export type SAVE_ANSWER_ACTION_TYPES = SaveAnswerAction | GetAnswersAction;
