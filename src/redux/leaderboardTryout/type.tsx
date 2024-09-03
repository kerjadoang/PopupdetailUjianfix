const BASE_NAME = 'LEADERBOARD_TRYOUT';
export const LEADERBOARD_TRYOUT_REQUEST = `${BASE_NAME}_REQUEST`;
export const LEADERBOARD_TRYOUT_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const LEADERBOARD_TRYOUT_FAILED = `${BASE_NAME}_FAILED`;
export const LEADERBOARD_TRYOUT_DESTROY = `${BASE_NAME}_DESTROY`;

interface leaderboardTryoutRequestAction {
  type: typeof LEADERBOARD_TRYOUT_REQUEST;
}

interface leaderboardTryoutSuccessAction {
  type: typeof LEADERBOARD_TRYOUT_SUCCESS;
  payload: {data: any};
}

interface leaderboardTryoutFailedAction {
  type: typeof LEADERBOARD_TRYOUT_FAILED;
  payload: any;
}

interface leaderboardTryoutDestroyAction {
  type: typeof LEADERBOARD_TRYOUT_DESTROY;
}

export type LEADERBOARD_TRYOUT_ACTION_TYPES =
  | leaderboardTryoutRequestAction
  | leaderboardTryoutSuccessAction
  | leaderboardTryoutFailedAction
  | leaderboardTryoutDestroyAction;
