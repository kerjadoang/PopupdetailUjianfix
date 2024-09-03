const BASE_NAME = 'CHECK_ONE_QUESTION';
export const CHECK_ONE_QUESTION_REQUEST = `${BASE_NAME}_REQUEST`;
export const CHECK_ONE_QUESTION_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CHECK_ONE_QUESTION_FAILED = `${BASE_NAME}_FAILED`;
export const CHECK_ONE_QUESTION_DESTROY = `${BASE_NAME}_DESTROY`;

interface checkOneQuestionRequestAction {
  type: typeof CHECK_ONE_QUESTION_REQUEST;
}

interface checkOneQuestionSuccessAction {
  type: typeof CHECK_ONE_QUESTION_SUCCESS;
  payload: {data: any};
}

interface checkOneQuestionFailedAction {
  type: typeof CHECK_ONE_QUESTION_FAILED;
  payload: any;
}

interface checkOneQuestionDestroyAction {
  type: typeof CHECK_ONE_QUESTION_DESTROY;
}

export type CHECK_ONE_QUESTION_ACTION_TYPES =
  | checkOneQuestionRequestAction
  | checkOneQuestionSuccessAction
  | checkOneQuestionFailedAction
  | checkOneQuestionDestroyAction;
