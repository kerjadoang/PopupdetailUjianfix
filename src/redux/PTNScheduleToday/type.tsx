const BASE_NAME = 'PTN_SCHEDULE';
export const PTN_SCHEDULE_REQUEST = `${BASE_NAME}_REQUEST`;
export const PTN_SCHEDULE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PTN_SCHEDULE_FAILED = `${BASE_NAME}_FAILED`;
export const PTN_SCHEDULE_DESTROY = `${BASE_NAME}_DESTROY`;

interface PTNScheduleRequestAction {
  type: typeof PTN_SCHEDULE_REQUEST;
}

interface PTNScheduleSuccessAction {
  type: typeof PTN_SCHEDULE_SUCCESS;
  payload: {data: any};
}

interface PTNScheduleFailedAction {
  type: typeof PTN_SCHEDULE_FAILED;
  payload: any;
}

interface PTNScheduleDestroyAction {
  type: typeof PTN_SCHEDULE_DESTROY;
}

export type PTN_SCHEDULE_ACTION_TYPES =
  | PTNScheduleRequestAction
  | PTNScheduleSuccessAction
  | PTNScheduleFailedAction
  | PTNScheduleDestroyAction;
