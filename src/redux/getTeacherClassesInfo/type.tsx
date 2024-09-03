const BASE_NAME = 'GET_TEACHER_CLASSES_INFO';
export const GET_TEACHER_CLASSES_INFO_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_TEACHER_CLASSES_INFO_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_TEACHER_CLASSES_INFO_FAILED = `${BASE_NAME}_FAILED`;
export const GET_TEACHER_CLASSES_INFO_DESTROY = `${BASE_NAME}_DESTROY`;

interface GetTeacherClassesInfoRequestAction {
  type: typeof GET_TEACHER_CLASSES_INFO_REQUEST;
}

interface GetTeacherClassesInfoSuccessAction {
  type: typeof GET_TEACHER_CLASSES_INFO_SUCCESS;
  payload: {data: any};
}

interface GetTeacherClassesInfoFailedAction {
  type: typeof GET_TEACHER_CLASSES_INFO_FAILED;
  payload: any;
}

interface GetTeacherClassesInfoDestroyAction {
  type: typeof GET_TEACHER_CLASSES_INFO_DESTROY;
}

export type GET_TEACHER_CLASSES_INFO_ACTION_TYPES =
  | GetTeacherClassesInfoRequestAction
  | GetTeacherClassesInfoSuccessAction
  | GetTeacherClassesInfoFailedAction
  | GetTeacherClassesInfoDestroyAction;
