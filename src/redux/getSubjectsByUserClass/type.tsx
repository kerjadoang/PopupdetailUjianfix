const BASE_NAME = 'GET_SUBJECTS_BY_USER_CLASS';
export const GET_SUBJECTS_BY_USER_CLASS_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_SUBJECTS_BY_USER_CLASS_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_SUBJECTS_BY_USER_CLASS_FAILED = `${BASE_NAME}_FAILED`;
export const GET_SUBJECTS_BY_USER_CLASS_DESTROY = `${BASE_NAME}_DESTROY`;

interface getSubjectByUserClassRequestAction {
  type: typeof GET_SUBJECTS_BY_USER_CLASS_REQUEST;
}

interface getSubjectByUserClassSuccessAction {
  type: typeof GET_SUBJECTS_BY_USER_CLASS_SUCCESS;
  payload: {data: any};
}

interface getSubjectByUserClassFailedAction {
  type: typeof GET_SUBJECTS_BY_USER_CLASS_FAILED;
  payload: any;
}

interface getSubjectByUserClassDestroyAction {
  type: typeof GET_SUBJECTS_BY_USER_CLASS_DESTROY;
}

export type GET_SUBJECTS_BY_USER_CLASS_ACTION_TYPES =
  | getSubjectByUserClassRequestAction
  | getSubjectByUserClassSuccessAction
  | getSubjectByUserClassFailedAction
  | getSubjectByUserClassDestroyAction;
