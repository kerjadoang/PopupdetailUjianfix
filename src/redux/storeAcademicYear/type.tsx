const BASE_NAME = 'POST_ACADEMIC_YEAR';
export const POST_ACADEMIC_YEAR_REQUEST = `${BASE_NAME}_REQUEST`;
export const POST_ACADEMIC_YEAR_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const POST_ACADEMIC_YEAR_FAILED = `${BASE_NAME}_FAILED`;
export const POST_ACADEMIC_YEAR_DESTROY = `${BASE_NAME}_DESTROY`;

interface storeAcademicYearRequestAction {
  type: typeof POST_ACADEMIC_YEAR_REQUEST;
}

interface storeAcademicYearSuccessAction {
  type: typeof POST_ACADEMIC_YEAR_SUCCESS;
  payload: {data: any};
}

interface storeAcademicYearFailedAction {
  type: typeof POST_ACADEMIC_YEAR_FAILED;
  payload: any;
}

interface storeAcademicYearDestroyAction {
  type: typeof POST_ACADEMIC_YEAR_DESTROY;
}

export type _IPayloadAcademicYear = {
  academic_year_id: number;
  rombel_class_school_id: number;
  class_id: number;
  school_id: number;
};

export type POST_ACADEMIC_YEAR_ACTION_TYPES =
  | storeAcademicYearRequestAction
  | storeAcademicYearSuccessAction
  | storeAcademicYearFailedAction
  | storeAcademicYearDestroyAction;
