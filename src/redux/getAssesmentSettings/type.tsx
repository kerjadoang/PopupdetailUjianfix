const BASE_NAME = 'ASSESMENT_SET';
export const ASSESMENT_SET_REQUEST = `${BASE_NAME}_REQUEST`;
export const ASSESMENT_SET_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ASSESMENT_SET_FAILED = `${BASE_NAME}_FAILED`;
export const ASSESMENT_SET_DESTROY = `${BASE_NAME}_DESTROY`;

interface AssesmentSetRequestAction {
  type: typeof ASSESMENT_SET_REQUEST;
}

interface AssesmentSetSuccessAction {
  type: typeof ASSESMENT_SET_SUCCESS;
  payload: {data: any};
}

interface AssesmentSetFailedAction {
  type: typeof ASSESMENT_SET_FAILED;
  payload: any;
}

interface AssesmentSetDestroyAction {
  type: typeof ASSESMENT_SET_DESTROY;
}

export type ASSESMENT_SET_ACTION_TYPES =
  | AssesmentSetRequestAction
  | AssesmentSetSuccessAction
  | AssesmentSetFailedAction
  | AssesmentSetDestroyAction;
