const BASE_NAME = 'GET_KUIS_QUESTION';
export const GET_KUIS_QUESTION_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_KUIS_QUESTION_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_KUIS_QUESTION_FAILED = `${BASE_NAME}_FAILED`;
export const GET_KUIS_QUESTION_DESTROY = `${BASE_NAME}_DESTROY`;

interface getKuisQuestionRequestAction {
  type: typeof GET_KUIS_QUESTION_REQUEST;
}

interface getKuisQuestionSuccessAction {
  type: typeof GET_KUIS_QUESTION_SUCCESS;
  payload: {data: any};
}

interface getKuisQuestionFailedAction {
  type: typeof GET_KUIS_QUESTION_FAILED;
  payload: any;
}

interface getKuisQuestionDestroyAction {
  type: typeof GET_KUIS_QUESTION_DESTROY;
}

export type GET_KUIS_QUESTION_ACTION_TYPES =
  | getKuisQuestionRequestAction
  | getKuisQuestionSuccessAction
  | getKuisQuestionFailedAction
  | getKuisQuestionDestroyAction;
