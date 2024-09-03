const BASE_NAME = 'SUBJECTS';
export const SUBJECTS_REQUEST = `${BASE_NAME}_REQUEST`;
export const SUBJECTS_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SUBJECTS_FAILED = `${BASE_NAME}_FAILED`;
export const SUBJECTS_DESTROY = `${BASE_NAME}_DESTROY`;

interface SubjectsRequestAction {
  type: typeof SUBJECTS_REQUEST;
}

interface SubjectsSuccessAction {
  type: typeof SUBJECTS_SUCCESS;
  payload: {data: any};
}

interface SubjectsFailedAction {
  type: typeof SUBJECTS_FAILED;
  payload: any;
}

interface SubjectsDestroyAction {
  type: typeof SUBJECTS_DESTROY;
}

export type SUBJECTS_ACTION_TYPES =
  | SubjectsRequestAction
  | SubjectsSuccessAction
  | SubjectsFailedAction
  | SubjectsDestroyAction;
