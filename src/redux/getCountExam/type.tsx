const BASE_NAME = 'GET_COUNT_EXAM';
export const GET_COUNT_EXAM_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_COUNT_EXAM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_COUNT_EXAM_FAILED = `${BASE_NAME}_FAILED`;
export const GET_COUNT_EXAM_DESTROY = `${BASE_NAME}_DESTROY`;

interface GetCountExamRequestAction {
  type: typeof GET_COUNT_EXAM_REQUEST;
}

interface GetCountExamSuccessAction {
  type: typeof GET_COUNT_EXAM_SUCCESS;
  payload: {data: any};
}

interface GetCountExamFailedAction {
  type: typeof GET_COUNT_EXAM_FAILED;
  payload: any;
}

interface GetCountExamDestroyAction {
  type: typeof GET_COUNT_EXAM_DESTROY;
}

export type GET_COUNT_EXAM_ACTION_TYPES =
  | GetCountExamRequestAction
  | GetCountExamSuccessAction
  | GetCountExamFailedAction
  | GetCountExamDestroyAction;
