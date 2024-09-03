const BASE_NAME = 'SUBJECTS_FAV';
export const SUBJECTS_FAV_REQUEST = `${BASE_NAME}_REQUEST`;
export const SUBJECTS_FAV_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SUBJECTS_FAV_FAILED = `${BASE_NAME}_FAILED`;
export const SUBJECTS_FAV_DESTROY = `${BASE_NAME}_DESTROY`;

interface SubjectsFavRequestAction {
  type: typeof SUBJECTS_FAV_REQUEST;
}

interface SubjectsFavSuccessAction {
  type: typeof SUBJECTS_FAV_SUCCESS;
  payload: {data: any};
}

interface SubjectsFavFailedAction {
  type: typeof SUBJECTS_FAV_FAILED;
  payload: any;
}

interface SubjectsFavDestroyAction {
  type: typeof SUBJECTS_FAV_DESTROY;
}

export type SUBJECTS_FAV_ACTION_TYPES =
  | SubjectsFavRequestAction
  | SubjectsFavSuccessAction
  | SubjectsFavFailedAction
  | SubjectsFavDestroyAction;
