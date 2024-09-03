const BASE_NAME = 'ACADEMIC_YEAR_ONGOING';
export const ACADEMIC_YEAR_ONGOING_REQUEST = `${BASE_NAME}_REQUEST`;
export const ACADEMIC_YEAR_ONGOING_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ACADEMIC_YEAR_ONGOING_FAILED = `${BASE_NAME}_FAILED`;
export const ACADEMIC_YEAR_ONGOING_DESTROY = `${BASE_NAME}_DESTROY`;

interface AcademicYearOngoingRequestAction {
  type: typeof ACADEMIC_YEAR_ONGOING_REQUEST;
}

interface AcademicYearOngoingSuccessAction {
  type: typeof ACADEMIC_YEAR_ONGOING_SUCCESS;
  payload: {data: any};
}

interface AcademicYearOngoingFailedAction {
  type: typeof ACADEMIC_YEAR_ONGOING_FAILED;
  payload: any;
}

interface AcademicYearOngoingDestroyAction {
  type: typeof ACADEMIC_YEAR_ONGOING_DESTROY;
}

export type ACADEMIC_YEAR_ONGOING_ACTION_TYPES =
  | AcademicYearOngoingRequestAction
  | AcademicYearOngoingSuccessAction
  | AcademicYearOngoingFailedAction
  | AcademicYearOngoingDestroyAction;
