const BASE_NAME = 'RANK';
export const RANK_REQUEST = `${BASE_NAME}_REQUEST`;
export const RANK_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const RANK_FAILED = `${BASE_NAME}_FAILED`;
export const RANK_DESTROY = `${BASE_NAME}_DESTROY`;

interface RankRequestAction {
  type: typeof RANK_REQUEST;
}

interface RankSuccessAction {
  type: typeof RANK_SUCCESS;
  payload: {data: any};
}

interface RankFailedAction {
  type: typeof RANK_FAILED;
  payload: any;
}

interface RankDestroyAction {
  type: typeof RANK_DESTROY;
}

export type RANK_ACTION_TYPES =
  | RankRequestAction
  | RankSuccessAction
  | RankFailedAction
  | RankDestroyAction;
