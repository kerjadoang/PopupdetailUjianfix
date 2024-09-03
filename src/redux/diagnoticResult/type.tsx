const BASE_NAME = 'DIAGNOTIC_RESULT_PROFESSION';
export const DIAGNOTIC_RESULT_PROFESSION_REQUEST = `${BASE_NAME}_REQUEST`;
export const DIAGNOTIC_RESULT_PROFESSION_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const DIAGNOTIC_RESULT_PROFESSION_FAILED = `${BASE_NAME}_FAILED`;
export const DIAGNOTIC_RESULT_PROFESSION_DESTROY = `${BASE_NAME}_DESTROY`;
export const DIAGNOTIC_RESULT_PROFESSION = BASE_NAME;

interface diagnoticResultProfessionAction {
  type: typeof DIAGNOTIC_RESULT_PROFESSION;
}

interface diagnoticResultProfessionRequestAction {
  type: typeof DIAGNOTIC_RESULT_PROFESSION_REQUEST;
}

interface diagnoticResultProfessionSuccessAction {
  type: typeof DIAGNOTIC_RESULT_PROFESSION_SUCCESS;
  payload: {data: any};
}

interface diagnoticResultProfessionFailedAction {
  type: typeof DIAGNOTIC_RESULT_PROFESSION_FAILED;
  payload: any;
}

interface diagnoticResultProfessionDestroyAction {
  type: typeof DIAGNOTIC_RESULT_PROFESSION_DESTROY;
}

export type DIAGNOTIC_RESULT_PROFESSION_ACTION_TYPES =
  | diagnoticResultProfessionRequestAction
  | diagnoticResultProfessionSuccessAction
  | diagnoticResultProfessionFailedAction
  | diagnoticResultProfessionDestroyAction
  | diagnoticResultProfessionAction;

const BASE_NAME_MAJORS = 'DIAGNOTIC_RESULT_MAJORS';
export const DIAGNOTIC_RESULT_MAJORS_REQUEST = `${BASE_NAME_MAJORS}_REQUEST`;
export const DIAGNOTIC_RESULT_MAJORS_SUCCESS = `${BASE_NAME_MAJORS}_SUCCESS`;
export const DIAGNOTIC_RESULT_MAJORS_FAILED = `${BASE_NAME_MAJORS}_FAILED`;
export const DIAGNOTIC_RESULT_MAJORS_DESTROY = `${BASE_NAME_MAJORS}_DESTROY`;
export const DIAGNOTIC_RESULT_MAJORS = BASE_NAME_MAJORS;

interface diagnoticResultMajorsAction {
  type: typeof DIAGNOTIC_RESULT_MAJORS;
}

interface diagnoticResultMajorsRequestAction {
  type: typeof DIAGNOTIC_RESULT_MAJORS_REQUEST;
}

interface diagnoticResultMajorsSuccessAction {
  type: typeof DIAGNOTIC_RESULT_MAJORS_SUCCESS;
  payload: {data: any};
}

interface diagnoticResultMajorsFailedAction {
  type: typeof DIAGNOTIC_RESULT_MAJORS_FAILED;
  payload: any;
}

interface diagnoticResultMajorsDestroyAction {
  type: typeof DIAGNOTIC_RESULT_MAJORS_DESTROY;
}

export type DIAGNOTIC_RESULT_MAJORS_ACTION_TYPES =
  | diagnoticResultMajorsRequestAction
  | diagnoticResultMajorsSuccessAction
  | diagnoticResultMajorsFailedAction
  | diagnoticResultMajorsDestroyAction
  | diagnoticResultMajorsAction;
