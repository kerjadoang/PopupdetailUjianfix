const BASE_NAME = 'ESSAY_PRACTICE';
export const ESSAY_PRACTICE_REQUEST = `${BASE_NAME}_REQUEST`;
export const ESSAY_PRACTICE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ESSAY_PRACTICE_FAILED = `${BASE_NAME}_FAILED`;
export const ESSAY_PRACTICE_DESTROY = `${BASE_NAME}_DESTROY`;

interface EssayPracticeRequestAction {
  type: typeof ESSAY_PRACTICE_REQUEST;
}

interface EssayPracticeSuccessAction {
  type: typeof ESSAY_PRACTICE_SUCCESS;
  payload: {data: any};
}

interface EssayPracticeFailedAction {
  type: typeof ESSAY_PRACTICE_FAILED;
  payload: any;
}

interface EssayPracticeDestroyAction {
  type: typeof ESSAY_PRACTICE_DESTROY;
}

export type ESSAY_PRACTICE_ACTION_TYPES =
  | EssayPracticeRequestAction
  | EssayPracticeSuccessAction
  | EssayPracticeFailedAction
  | EssayPracticeDestroyAction;
