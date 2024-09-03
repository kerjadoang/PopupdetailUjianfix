const BASE_NAME = 'SCORING_EXAM';
export const SCORING_EXAM_REQUEST = `${BASE_NAME}_REQUEST`;
export const SCORING_EXAM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SCORING_EXAM_FAILED = `${BASE_NAME}_FAILED`;
export const SCORING_EXAM_DESTROY = `${BASE_NAME}_DESTROY`;

interface scoringExamRequestAction {
  type: typeof SCORING_EXAM_REQUEST;
}

interface scoringExamSuccessAction {
  type: typeof SCORING_EXAM_SUCCESS;
  payload: {data: any};
}

interface scoringExamFailedAction {
  type: typeof SCORING_EXAM_FAILED;
  payload: any;
}

interface scoringExamDestroyAction {
  type: typeof SCORING_EXAM_DESTROY;
}

export type SCORING_EXAM_ACTION_TYPES =
  | scoringExamRequestAction
  | scoringExamSuccessAction
  | scoringExamFailedAction
  | scoringExamDestroyAction;
