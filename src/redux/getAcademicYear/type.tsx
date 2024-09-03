const BASE_NAME = 'ACADEMIC_YEAR';
export const ACADEMIC_YEAR_REQUEST = `${BASE_NAME}_REQUEST`;
export const ACADEMIC_YEAR_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ACADEMIC_YEAR_FAILED = `${BASE_NAME}_FAILED`;
export const ACADEMIC_YEAR_DESTROY = `${BASE_NAME}_DESTROY`;

interface AcademicYearRequestAction {
  type: typeof ACADEMIC_YEAR_REQUEST;
}

interface AcademicYearSuccessAction {
  type: typeof ACADEMIC_YEAR_SUCCESS;
  payload: {data: any};
}

interface AcademicYearFailedAction {
  type: typeof ACADEMIC_YEAR_FAILED;
  payload: any;
}

interface AcademicYearDestroyAction {
  type: typeof ACADEMIC_YEAR_DESTROY;
}

export type ACADEMIC_YEAR_ACTION_TYPES =
  | AcademicYearRequestAction
  | AcademicYearSuccessAction
  | AcademicYearFailedAction
  | AcademicYearDestroyAction;
