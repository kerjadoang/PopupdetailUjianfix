const BASE_NAME = 'GET_ROMBEL_WITH_STUDENT_REQUEST';
export const GET_ROMBEL_WITH_STUDENT_REQUEST_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ROMBEL_WITH_STUDENT_REQUEST_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ROMBEL_WITH_STUDENT_REQUEST_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ROMBEL_WITH_STUDENT_REQUEST_DESTROY = `${BASE_NAME}_DESTROY`;

interface getRombelWithStudentRequestsRequestAction {
  type: typeof GET_ROMBEL_WITH_STUDENT_REQUEST_REQUEST;
}

interface getRombelWithStudentRequestsSuccessAction {
  type: typeof GET_ROMBEL_WITH_STUDENT_REQUEST_SUCCESS;
  payload: {data: any};
}

interface getRombelWithStudentRequestsFailedAction {
  type: typeof GET_ROMBEL_WITH_STUDENT_REQUEST_FAILED;
  payload: any;
}

interface getRombelWithStudentRequestsDestroyAction {
  type: typeof GET_ROMBEL_WITH_STUDENT_REQUEST_DESTROY;
}

export type GET_ROMBEL_WITH_STUDENT_REQUEST_ACTION_TYPES =
  | getRombelWithStudentRequestsRequestAction
  | getRombelWithStudentRequestsSuccessAction
  | getRombelWithStudentRequestsFailedAction
  | getRombelWithStudentRequestsDestroyAction;
