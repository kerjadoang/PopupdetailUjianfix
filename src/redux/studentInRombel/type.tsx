const BASE_NAME = 'STUDENT_IN_ROMBEL';
export const STUDENT_IN_ROMBEL_REQUEST = `${BASE_NAME}_REQUEST`;
export const STUDENT_IN_ROMBEL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const STUDENT_IN_ROMBEL_FAILED = `${BASE_NAME}_FAILED`;
export const STUDENT_IN_ROMBEL_DESTROY = `${BASE_NAME}_DESTROY`;

interface getStudentInRombelRequestAction {
  type: typeof STUDENT_IN_ROMBEL_REQUEST;
}

interface getStudentInRombelSuccessAction {
  type: typeof STUDENT_IN_ROMBEL_SUCCESS;
  payload: {data: any};
}

interface getStudentInRombelFailedAction {
  type: typeof STUDENT_IN_ROMBEL_FAILED;
  payload: any;
}

interface getStudentInRombelDestroyAction {
  type: typeof STUDENT_IN_ROMBEL_DESTROY;
}

export type STUDENT_IN_ROMBEL_ACTION_TYPES =
  | getStudentInRombelRequestAction
  | getStudentInRombelSuccessAction
  | getStudentInRombelFailedAction
  | getStudentInRombelDestroyAction;
