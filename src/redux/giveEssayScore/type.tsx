const BASE_NAME = 'GIVE_ESSAY_SCORE';
export const GIVE_ESSAY_SCORE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GIVE_ESSAY_SCORE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GIVE_ESSAY_SCORE_FAILED = `${BASE_NAME}_FAILED`;
export const GIVE_ESSAY_SCORE_DESTROY = `${BASE_NAME}_DESTROY`;

interface sendEssayScoreRequestAction {
  type: typeof GIVE_ESSAY_SCORE_REQUEST;
}

interface sendEssayScoreSuccessAction {
  type: typeof GIVE_ESSAY_SCORE_SUCCESS;
  payload: {data: any};
}

interface sendEssayScoreFailedAction {
  type: typeof GIVE_ESSAY_SCORE_FAILED;
  payload: any;
}

interface sendEssayScoreDestroyAction {
  type: typeof GIVE_ESSAY_SCORE_DESTROY;
}

export type _IPayloadEsayScore = {
  essay_point: number;
};

export type GIVE_ESSAY_SCORE_ACTION_TYPES =
  | sendEssayScoreRequestAction
  | sendEssayScoreSuccessAction
  | sendEssayScoreFailedAction
  | sendEssayScoreDestroyAction;
