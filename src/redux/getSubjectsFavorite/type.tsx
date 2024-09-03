const BASE_NAME = 'GET_SUBJECTS_FAVORITE';
export const GET_SUBJECTS_FAVORITE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_SUBJECTS_FAVORITE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_SUBJECTS_FAVORITE_FAILED = `${BASE_NAME}_FAILED`;
export const GET_SUBJECTS_FAVORITE_DESTROY = `${BASE_NAME}_DESTROY`;

interface GetSubjectsFavoriteByUserClassRequestAction {
  type: typeof GET_SUBJECTS_FAVORITE_REQUEST;
}

interface GetSubjectsFavoriteByUserClassSuccessAction {
  type: typeof GET_SUBJECTS_FAVORITE_SUCCESS;
  payload: {data: any};
}

interface GetSubjectsFavoriteByUserClassFailedAction {
  type: typeof GET_SUBJECTS_FAVORITE_FAILED;
  payload: any;
}

interface GetSubjectsFavoriteByUserClassDestroyAction {
  type: typeof GET_SUBJECTS_FAVORITE_DESTROY;
}

export type GET_SUBJECTS_FAVORITE_ACTION_TYPES =
  | GetSubjectsFavoriteByUserClassRequestAction
  | GetSubjectsFavoriteByUserClassSuccessAction
  | GetSubjectsFavoriteByUserClassFailedAction
  | GetSubjectsFavoriteByUserClassDestroyAction;
