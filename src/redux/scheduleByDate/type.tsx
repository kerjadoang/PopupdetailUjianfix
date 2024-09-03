const BASE_NAME = 'SCHEDULE_BY_DATE';
export const SCHEDULE_BY_DATE_REQUEST = `${BASE_NAME}_REQUEST`;
export const SCHEDULE_BY_DATE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SCHEDULE_BY_DATE_FAILED = `${BASE_NAME}_FAILED`;
export const SCHEDULE_BY_DATE_DESTROY = `${BASE_NAME}_DESTROY`;

interface ScheduleByDateRequestAction {
  type: typeof SCHEDULE_BY_DATE_REQUEST;
}

interface ScheduleByDateSuccessAction {
  type: typeof SCHEDULE_BY_DATE_SUCCESS;
  payload: {data: any};
}

interface ScheduleByDateFailedAction {
  type: typeof SCHEDULE_BY_DATE_FAILED;
  payload: any;
}

interface ScheduleByDateDestroyAction {
  type: typeof SCHEDULE_BY_DATE_DESTROY;
}

export type SCHEDULE_BY_DATE_ACTION_TYPES =
  | ScheduleByDateRequestAction
  | ScheduleByDateSuccessAction
  | ScheduleByDateFailedAction
  | ScheduleByDateDestroyAction;
