const BASE_NAME = 'ANNOUNCEMENT';
export const ANNOUNCEMENT_REQUEST = `${BASE_NAME}_REQUEST`;
export const ANNOUNCEMENT_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ANNOUNCEMENT_FAILED = `${BASE_NAME}_FAILED`;
export const ANNOUNCEMENT_DESTROY = `${BASE_NAME}_DESTROY`;

interface AnnouncementRequestAction {
  type: typeof ANNOUNCEMENT_REQUEST;
}

interface AnnouncementSuccessAction {
  type: typeof ANNOUNCEMENT_SUCCESS;
  payload: {data: any};
}

interface AnnouncementFailedAction {
  type: typeof ANNOUNCEMENT_FAILED;
  payload: any;
}

interface AnnouncementDestroyAction {
  type: typeof ANNOUNCEMENT_DESTROY;
}

export type ANNOUNCEMENT_ACTION_TYPES =
  | AnnouncementRequestAction
  | AnnouncementSuccessAction
  | AnnouncementFailedAction
  | AnnouncementDestroyAction;
