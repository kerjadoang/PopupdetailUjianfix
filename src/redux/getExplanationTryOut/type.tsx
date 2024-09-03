const BASE_NAME = 'GET_EXPLANATION_TRYOUT';
export const GET_EXPLANATION_TRYOUT_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_EXPLANATION_TRYOUT_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_EXPLANATION_TRYOUT_FAILED = `${BASE_NAME}_FAILED`;
export const GET_EXPLANATION_TRYOUT_DESTROY = `${BASE_NAME}_DESTROY`;

interface getExplanationTryouteRequestAction {
  type: typeof GET_EXPLANATION_TRYOUT_REQUEST;
}

interface getExplanationTryouteSuccessAction {
  type: typeof GET_EXPLANATION_TRYOUT_SUCCESS;
  payload: {data: any};
}

interface getExplanationTryouteFailedAction {
  type: typeof GET_EXPLANATION_TRYOUT_FAILED;
  payload: any;
}

interface getExplanationTryouteDestroyAction {
  type: typeof GET_EXPLANATION_TRYOUT_DESTROY;
}

export type GET_EXPLANATION_TRYOUT_ACTION_TYPES =
  | getExplanationTryouteRequestAction
  | getExplanationTryouteSuccessAction
  | getExplanationTryouteFailedAction
  | getExplanationTryouteDestroyAction;
