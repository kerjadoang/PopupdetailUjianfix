const BASE_NAME = 'SCHOOL';
export const SCHOOL_REQUEST = `${BASE_NAME}_REQUEST`;
export const SCHOOL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SCHOOL_FAILED = `${BASE_NAME}_FAILED`;
export const SCHOOL_DESTROY = `${BASE_NAME}_DESTROY`;

interface SchoolRequestAction {
  type: typeof SCHOOL_REQUEST;
}

interface SchoolSuccessAction {
  type: typeof SCHOOL_SUCCESS;
  payload: {data: any};
}

interface SchoolFailedAction {
  type: typeof SCHOOL_FAILED;
  payload: any;
}

interface SchoolDestroyAction {
  type: typeof SCHOOL_DESTROY;
}

export type SCHOOL_ACTION_TYPES =
  | SchoolRequestAction
  | SchoolSuccessAction
  | SchoolFailedAction
  | SchoolDestroyAction;
