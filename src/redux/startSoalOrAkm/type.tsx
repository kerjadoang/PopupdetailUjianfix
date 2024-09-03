const BASE_NAME = 'START_SOAL_OR_AKM';
export const START_SOAL_OR_AKM_REQUEST = `${BASE_NAME}_REQUEST`;
export const START_SOAL_OR_AKM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const START_SOAL_OR_AKM_FAILED = `${BASE_NAME}_FAILED`;
export const START_SOAL_OR_AKM_DESTROY = `${BASE_NAME}_DESTROY`;

interface getStudentInRombelRequestAction {
  type: typeof START_SOAL_OR_AKM_REQUEST;
}

interface getStudentInRombelSuccessAction {
  type: typeof START_SOAL_OR_AKM_SUCCESS;
  payload: {data: any};
}

interface getStudentInRombelFailedAction {
  type: typeof START_SOAL_OR_AKM_FAILED;
  payload: any;
}

interface getStudentInRombelDestroyAction {
  type: typeof START_SOAL_OR_AKM_DESTROY;
}

export type START_SOAL_OR_AKM_ACTION_TYPES =
  | getStudentInRombelRequestAction
  | getStudentInRombelSuccessAction
  | getStudentInRombelFailedAction
  | getStudentInRombelDestroyAction;
