const BASE_NAME = 'GET_TEACHER_MATERIALS';
export const GET_TEACHER_MATERIALS_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_TEACHER_MATERIALS_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_TEACHER_MATERIALS_FAILED = `${BASE_NAME}_FAILED`;
export const GET_TEACHER_MATERIALS_DESTROY = `${BASE_NAME}_DESTROY`;

interface getTeacherMaterialsRequestAction {
  type: typeof GET_TEACHER_MATERIALS_REQUEST;
}

interface getTeacherMaterialsSuccessAction {
  type: typeof GET_TEACHER_MATERIALS_SUCCESS;
  payload: {data: any};
}

interface getTeacherMaterialsFailedAction {
  type: typeof GET_TEACHER_MATERIALS_FAILED;
  payload: any;
}

interface getTeacherMaterialsDestroyAction {
  type: typeof GET_TEACHER_MATERIALS_DESTROY;
}

export type GET_TEACHER_MATERIALS_ACTION_TYPES =
  | getTeacherMaterialsRequestAction
  | getTeacherMaterialsSuccessAction
  | getTeacherMaterialsFailedAction
  | getTeacherMaterialsDestroyAction;
