const BASE_NAME = 'GET_SCHEDULE_CLASS_SESSION';
export const GET_SCHEDULE_CLASS_SESSION_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_SCHEDULE_CLASS_SESSION_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_SCHEDULE_CLASS_SESSION_FAILED = `${BASE_NAME}_FAILED`;
export const GET_SCHEDULE_CLASS_SESSION_DESTROY = `${BASE_NAME}_DESTROY`;

interface getScheduleClassSessionRequestAction {
  type: typeof GET_SCHEDULE_CLASS_SESSION_REQUEST;
}

interface getScheduleClassSessionSuccessAction {
  type: typeof GET_SCHEDULE_CLASS_SESSION_SUCCESS;
  payload: {data: any};
}

interface getScheduleClassSessionFailedAction {
  type: typeof GET_SCHEDULE_CLASS_SESSION_FAILED;
  payload: any;
}

interface getScheduleClassSessionDestroyAction {
  type: typeof GET_SCHEDULE_CLASS_SESSION_DESTROY;
}

export type GET_SCHEDULE_CLASS_SESSION_ACTION_TYPES =
  | getScheduleClassSessionRequestAction
  | getScheduleClassSessionSuccessAction
  | getScheduleClassSessionFailedAction
  | getScheduleClassSessionDestroyAction;
