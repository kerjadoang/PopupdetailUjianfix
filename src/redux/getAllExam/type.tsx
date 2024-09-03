const BASE_NAME = 'GET_ALL_EXAM';
export const GET_ALL_EXAM_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_EXAM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_EXAM_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_EXAM_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllExamRequestAction {
  type: typeof GET_ALL_EXAM_REQUEST;
}

interface getAllExamSuccessAction {
  type: typeof GET_ALL_EXAM_SUCCESS;
  payload: {data: any};
}

interface getAllExamFailedAction {
  type: typeof GET_ALL_EXAM_FAILED;
  payload: any;
}

interface getAllExamDestroyAction {
  type: typeof GET_ALL_EXAM_DESTROY;
}

export type GET_ALL_EXAM_ACTION_TYPES =
  | getAllExamRequestAction
  | getAllExamSuccessAction
  | getAllExamFailedAction
  | getAllExamDestroyAction;
