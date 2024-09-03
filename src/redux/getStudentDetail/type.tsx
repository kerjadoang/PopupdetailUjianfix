const BASE_NAME = 'STUDENT_DETAIL';
export const STUDENT_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const STUDENT_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const STUDENT_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const STUDENT_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface StudentDetailRequestAction {
  type: typeof STUDENT_DETAIL_REQUEST;
}

interface StudentDetailSuccessAction {
  type: typeof STUDENT_DETAIL_SUCCESS;
  payload: {data: any};
}

interface StudentDetailFailedAction {
  type: typeof STUDENT_DETAIL_FAILED;
  payload: any;
}

interface StudentDetailDestroyAction {
  type: typeof STUDENT_DETAIL_DESTROY;
}

export type STUDENT_DETAIL_ACTION_TYPES =
  | StudentDetailRequestAction
  | StudentDetailSuccessAction
  | StudentDetailFailedAction
  | StudentDetailDestroyAction;
