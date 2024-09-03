const BASE_NAME = 'GET_SUBJECTS_BY_CLASS';
export const GET_SUBJECTS_BY_CLASS_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_SUBJECTS_BY_CLASS_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_SUBJECTS_BY_CLASS_FAILED = `${BASE_NAME}_FAILED`;
export const GET_SUBJECTS_BY_CLASS_DESTROY = `${BASE_NAME}_DESTROY`;

interface getSubjectByClassRequestAction {
  type: typeof GET_SUBJECTS_BY_CLASS_REQUEST;
}

interface getSubjectByClassSuccessAction {
  type: typeof GET_SUBJECTS_BY_CLASS_SUCCESS;
  payload: {data: any};
}

interface getSubjectByClassFailedAction {
  type: typeof GET_SUBJECTS_BY_CLASS_FAILED;
  payload: any;
}

interface getSubjectByClassDestroyAction {
  type: typeof GET_SUBJECTS_BY_CLASS_DESTROY;
}

export type GET_SUBJECTS_BY_CLASS_ACTION_TYPES =
  | getSubjectByClassRequestAction
  | getSubjectByClassSuccessAction
  | getSubjectByClassFailedAction
  | getSubjectByClassDestroyAction;
