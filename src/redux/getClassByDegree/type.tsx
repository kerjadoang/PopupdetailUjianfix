const BASE_NAME = 'GET_CLASS_BY_DEGREE';
export const GET_CLASS_BY_DEGREE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_CLASS_BY_DEGREE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_CLASS_BY_DEGREE_FAILED = `${BASE_NAME}_FAILED`;
export const GET_CLASS_BY_DEGREE_DESTROY = `${BASE_NAME}_DESTROY`;

interface getClassByDegreeRequestAction {
  type: typeof GET_CLASS_BY_DEGREE_REQUEST;
}

interface getClassByDegreeSuccessAction {
  type: typeof GET_CLASS_BY_DEGREE_SUCCESS;
  payload: {data: any};
}

interface getClassByDegreeFailedAction {
  type: typeof GET_CLASS_BY_DEGREE_FAILED;
  payload: any;
}

interface getClassByDegreeDestroyAction {
  type: typeof GET_CLASS_BY_DEGREE_DESTROY;
}

export type GET_CLASS_BY_DEGREE_ACTION_TYPES =
  | getClassByDegreeRequestAction
  | getClassByDegreeSuccessAction
  | getClassByDegreeFailedAction
  | getClassByDegreeDestroyAction;
