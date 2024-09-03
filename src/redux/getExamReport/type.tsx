const BASE_NAME = 'EXAM';
export const EXAM_REQUEST = `${BASE_NAME}_REQUEST`;
export const EXAM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const EXAM_FAILED = `${BASE_NAME}_FAILED`;
export const EXAM_DESTROY = `${BASE_NAME}_DESTROY`;

interface ExamRequestAction {
  type: typeof EXAM_REQUEST;
}

interface ExamSuccessAction {
  type: typeof EXAM_SUCCESS;
  payload: {data: any};
}

interface ExamFailedAction {
  type: typeof EXAM_FAILED;
  payload: any;
}

interface ExamDestroyAction {
  type: typeof EXAM_DESTROY;
}

export type EXAM_ACTION_TYPES =
  | ExamRequestAction
  | ExamSuccessAction
  | ExamFailedAction
  | ExamDestroyAction;
