const BASE_NAME = 'GET_TASK_TEACHER_DETAIL';
export const GET_TASK_TEACHER_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_TASK_TEACHER_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_TASK_TEACHER_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const GET_TASK_TEACHER_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface getTaskTeacherDetailRequestAction {
  type: typeof GET_TASK_TEACHER_DETAIL_REQUEST;
}

interface getTaskTeacherDetailSuccessAction {
  type: typeof GET_TASK_TEACHER_DETAIL_SUCCESS;
  payload: {data: any};
}

interface getTaskTeacherDetailFailedAction {
  type: typeof GET_TASK_TEACHER_DETAIL_FAILED;
  payload: any;
}

interface getTaskTeacherDetailDestroyAction {
  type: typeof GET_TASK_TEACHER_DETAIL_DESTROY;
}

export type GET_TASK_TEACHER_DETAIL_ACTION_TYPES =
  | getTaskTeacherDetailRequestAction
  | getTaskTeacherDetailSuccessAction
  | getTaskTeacherDetailFailedAction
  | getTaskTeacherDetailDestroyAction;
