const BASE_NAME = 'UPDATE_READ_ACTIVITY_CONFIRM';
export const UPDATE_READ_ACTIVITY_CONFIRM_REQUEST = `${BASE_NAME}_REQUEST`;
export const UPDATE_READ_ACTIVITY_CONFIRM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const UPDATE_READ_ACTIVITY_CONFIRM_FAILED = `${BASE_NAME}_FAILED`;
export const UPDATE_READ_ACTIVITY_CONFIRM_DESTROY = `${BASE_NAME}_DESTROY`;

interface updateReadActivityConfirmRequestAction {
  type: typeof UPDATE_READ_ACTIVITY_CONFIRM_REQUEST;
}

interface updateReadActivityConfirmSuccessAction {
  type: typeof UPDATE_READ_ACTIVITY_CONFIRM_SUCCESS;
  payload: {data: any};
}

interface updateReadActivityConfirmFailedAction {
  type: typeof UPDATE_READ_ACTIVITY_CONFIRM_FAILED;
  payload: any;
}

interface updateReadActivityConfirmDestroyAction {
  type: typeof UPDATE_READ_ACTIVITY_CONFIRM_DESTROY;
}

export type UPDATE_READ_ACTIVITY_CONFIRM_ACTION_TYPES =
  | updateReadActivityConfirmRequestAction
  | updateReadActivityConfirmSuccessAction
  | updateReadActivityConfirmFailedAction
  | updateReadActivityConfirmDestroyAction;

export type IUpdateReadActivityConfirm = {
  uuid: any;
  type: 'Approved' | 'Rejected';
};
