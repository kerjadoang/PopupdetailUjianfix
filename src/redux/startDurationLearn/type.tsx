const BASE_NAME = 'START_DURATION_LEARN';
export const START_DURATION_LEARN_REQUEST = `${BASE_NAME}_REQUEST`;
export const START_DURATION_LEARN_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const START_DURATION_LEARN_FAILED = `${BASE_NAME}_FAILED`;
export const START_DURATION_LEARN_DESTROY = `${BASE_NAME}_DESTROY`;

interface StartDurationLearnRequestAction {
  type: typeof START_DURATION_LEARN_REQUEST;
}

interface StartDurationLearnSuccessAction {
  type: typeof START_DURATION_LEARN_SUCCESS;
  payload: {data: any};
}

interface StartDurationLearnFailedAction {
  type: typeof START_DURATION_LEARN_FAILED;
  payload: any;
}

interface StartDurationLearnDestroyAction {
  type: typeof START_DURATION_LEARN_DESTROY;
}

export type START_DURATION_LEARN_ACTION_TYPES =
  | StartDurationLearnRequestAction
  | StartDurationLearnSuccessAction
  | StartDurationLearnFailedAction
  | StartDurationLearnDestroyAction;
