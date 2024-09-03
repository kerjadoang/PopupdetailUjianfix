const BASE_NAME = 'GET_SUBJECT_BY_CURRICULUM_AND_CLASS';
export const GET_SUBJECT_BY_CURRICULUM_AND_CLASS_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_SUBJECT_BY_CURRICULUM_AND_CLASS_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_SUBJECT_BY_CURRICULUM_AND_CLASS_FAILED = `${BASE_NAME}_FAILED`;
export const GET_SUBJECT_BY_CURRICULUM_AND_CLASS_DESTROY = `${BASE_NAME}_DESTROY`;

interface getSubjectByCurriculumAndClassRequestAction {
  type: typeof GET_SUBJECT_BY_CURRICULUM_AND_CLASS_REQUEST;
}

interface getSubjectByCurriculumAndClassSuccessAction {
  type: typeof GET_SUBJECT_BY_CURRICULUM_AND_CLASS_SUCCESS;
  payload: {data: any};
}

interface getSubjectByCurriculumAndClassFailedAction {
  type: typeof GET_SUBJECT_BY_CURRICULUM_AND_CLASS_FAILED;
  payload: any;
}

interface getSubjectByCurriculumAndClassDestroyAction {
  type: typeof GET_SUBJECT_BY_CURRICULUM_AND_CLASS_DESTROY;
}

export type GET_SUBJECT_BY_CURRICULUM_AND_CLASS_ACTION_TYPES =
  | getSubjectByCurriculumAndClassRequestAction
  | getSubjectByCurriculumAndClassSuccessAction
  | getSubjectByCurriculumAndClassFailedAction
  | getSubjectByCurriculumAndClassDestroyAction;
