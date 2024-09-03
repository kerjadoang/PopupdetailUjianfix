const BASE_NAME = 'GET_CURRICULUM';
export const GET_CURRICULUM_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_CURRICULUM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_CURRICULUM_FAILED = `${BASE_NAME}_FAILED`;
export const GET_CURRICULUM_DESTROY = `${BASE_NAME}_DESTROY`;

interface GetCurriculumRequestAction {
  type: typeof GET_CURRICULUM_REQUEST;
}

interface GetCurriculumSuccessAction {
  type: typeof GET_CURRICULUM_SUCCESS;
  payload: {data: any};
}

interface GetCurriculumFailedAction {
  type: typeof GET_CURRICULUM_FAILED;
  payload: any;
}

interface GetCurriculumDestroyAction {
  type: typeof GET_CURRICULUM_DESTROY;
}

export type GET_CURRICULUM_ACTION_TYPES =
  | GetCurriculumRequestAction
  | GetCurriculumSuccessAction
  | GetCurriculumFailedAction
  | GetCurriculumDestroyAction;
