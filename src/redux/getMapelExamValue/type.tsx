const BASE_NAME = 'MAPEL_EXAM_VALUE';
export const MAPEL_EXAM_VALUE_REQUEST = `${BASE_NAME}_REQUEST`;
export const MAPEL_EXAM_VALUE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const MAPEL_EXAM_VALUE_FAILED = `${BASE_NAME}_FAILED`;
export const MAPEL_EXAM_VALUE_DESTROY = `${BASE_NAME}_DESTROY`;

interface MapelExamValueRequestAction {
  type: typeof MAPEL_EXAM_VALUE_REQUEST;
}

interface MapelExamValueSuccessAction {
  type: typeof MAPEL_EXAM_VALUE_SUCCESS;
  payload: {data: any};
}

interface MapelExamValueFailedAction {
  type: typeof MAPEL_EXAM_VALUE_FAILED;
  payload: any;
}

interface MapelExamValueDestroyAction {
  type: typeof MAPEL_EXAM_VALUE_DESTROY;
}

export type MAPEL_EXAM_VALUE_ACTION_TYPES =
  | MapelExamValueRequestAction
  | MapelExamValueSuccessAction
  | MapelExamValueFailedAction
  | MapelExamValueDestroyAction;
