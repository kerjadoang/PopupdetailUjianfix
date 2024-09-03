const BASE_NAME = 'END_DURATION_LEARN';
export const END_DURATION_LEARN_REQUEST = `${BASE_NAME}_REQUEST`;
export const END_DURATION_LEARN_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const END_DURATION_LEARN_FAILED = `${BASE_NAME}_FAILED`;
export const END_DURATION_LEARN_DESTROY = `${BASE_NAME}_DESTROY`;

interface endDurationLearnRequestAction {
  type: typeof END_DURATION_LEARN_REQUEST;
}

interface endDurationLearnSuccessAction {
  type: typeof END_DURATION_LEARN_SUCCESS;
  payload: {data: any};
}

interface endDurationLearnFailedAction {
  type: typeof END_DURATION_LEARN_FAILED;
  payload: any;
}

interface endDurationLearnDestroyAction {
  type: typeof END_DURATION_LEARN_DESTROY;
}

export type END_DURATION_LEARN_ACTION_TYPES =
  | endDurationLearnRequestAction
  | endDurationLearnSuccessAction
  | endDurationLearnFailedAction
  | endDurationLearnDestroyAction;
