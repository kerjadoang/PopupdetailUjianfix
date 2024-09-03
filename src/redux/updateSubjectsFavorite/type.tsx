const BASE_NAME = 'UPDATE_SUBJECTS_FAVORITE';
export const UPDATE_SUBJECTS_FAVORITE_REQUEST = `${BASE_NAME}_REQUEST`;
export const UPDATE_SUBJECTS_FAVORITE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const UPDATE_SUBJECTS_FAVORITE_FAILED = `${BASE_NAME}_FAILED`;
export const UPDATE_SUBJECTS_FAVORITE_DESTROY = `${BASE_NAME}_DESTROY`;

interface UpdateSubjectsFavoriteRequestAction {
  type: typeof UPDATE_SUBJECTS_FAVORITE_REQUEST;
}

interface UpdateSubjectsFavoriteSuccessAction {
  type: typeof UPDATE_SUBJECTS_FAVORITE_SUCCESS;
  payload: {data: any};
}

interface UpdateSubjectsFavoriteFailedAction {
  type: typeof UPDATE_SUBJECTS_FAVORITE_FAILED;
  payload: any;
}

interface UpdateSubjectsFavoriteDestroyAction {
  type: typeof UPDATE_SUBJECTS_FAVORITE_DESTROY;
}

export type UPDATE_SUBJECTS_FAVORITE_ACTION_TYPES =
  | UpdateSubjectsFavoriteRequestAction
  | UpdateSubjectsFavoriteSuccessAction
  | UpdateSubjectsFavoriteFailedAction
  | UpdateSubjectsFavoriteDestroyAction;
