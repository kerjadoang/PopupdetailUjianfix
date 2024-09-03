const BASE_NAME = 'REWARD';
export const REWARD_REQUEST = `${BASE_NAME}_REQUEST`;
export const REWARD_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const REWARD_FAILED = `${BASE_NAME}_FAILED`;
export const REWARD_DESTROY = `${BASE_NAME}_DESTROY`;

interface RewardRequestAction {
  type: typeof REWARD_REQUEST;
}

interface RewardSuccessAction {
  type: typeof REWARD_SUCCESS;
  payload: {data: any};
}

interface RewardFailedAction {
  type: typeof REWARD_FAILED;
  payload: any;
}

interface RewardDestroyAction {
  type: typeof REWARD_DESTROY;
}

export type REWARD_ACTION_TYPES =
  | RewardRequestAction
  | RewardSuccessAction
  | RewardFailedAction
  | RewardDestroyAction;
