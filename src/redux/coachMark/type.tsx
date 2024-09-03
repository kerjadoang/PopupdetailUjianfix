const BASE_NAME = 'GET_ALL_COACHMARK';
export const GET_ALL_COACHMARK_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_COACHMARK_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_COACHMARK_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_COACHMARK_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllCoachmarkRequestAction {
  type: typeof GET_ALL_COACHMARK_REQUEST;
}

interface getAllCoachmarkSuccessAction {
  type: typeof GET_ALL_COACHMARK_SUCCESS;
  payload: {data: any};
}

interface getAllCoachmarkFailedAction {
  type: typeof GET_ALL_COACHMARK_FAILED;
  payload: any;
}

interface getAllCoachmarkDestroyAction {
  type: typeof GET_ALL_COACHMARK_DESTROY;
}

export type DataTypeCoachmark = {
  coachmark_mobile_dashboard: boolean;
  coachmark_mobile_leaderboard: boolean;
  coachmark_mobile_schedule: boolean;
  coachmark_mobile_chapter: boolean;
  coachmark_mobile_regular: boolean;
  coachmark_mobile_tanya: boolean;
  coachmark_mobile_coin: boolean;
  coachmark_mobile_order: boolean;
  coachmark_mobile_parent: boolean;
  coachmark_mobile_soal: boolean;
  popup_mobile_tanya: boolean;
  popup_mobile_ptn: boolean;
};

export interface ICoachMarkInitialState {
  loading: boolean;
  data: DataTypeCoachmark;
  error: null;
}

export type GET_ALL_COACHMARK_ACTION_TYPES =
  | getAllCoachmarkRequestAction
  | getAllCoachmarkSuccessAction
  | getAllCoachmarkFailedAction
  | getAllCoachmarkDestroyAction;
