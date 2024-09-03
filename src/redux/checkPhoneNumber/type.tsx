const BASE_NAME = 'CHECK_PHONE_NUMBER';
export const CHECK_PHONE_NUMBER_REQUEST = `${BASE_NAME}_REQUEST`;
export const CHECK_PHONE_NUMBER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CHECK_PHONE_NUMBER_FAILED = `${BASE_NAME}_FAILED`;
export const CHECK_PHONE_NUMBER_DESTROY = `${BASE_NAME}_DESTROY`;

interface CheckPhoneNumberRequestAction {
  type: typeof CHECK_PHONE_NUMBER_REQUEST;
}

interface CheckPhoneNumberSuccessAction {
  type: typeof CHECK_PHONE_NUMBER_SUCCESS;
  payload: {data: any};
}

interface CheckPhoneNumberFailedAction {
  type: typeof CHECK_PHONE_NUMBER_FAILED;
  payload: any;
}

interface CheckPhoneNumberDestroyAction {
  type: typeof CHECK_PHONE_NUMBER_DESTROY;
}

export type CHECK_PHONE_NUMBER_ACTION_TYPES =
  | CheckPhoneNumberRequestAction
  | CheckPhoneNumberSuccessAction
  | CheckPhoneNumberFailedAction
  | CheckPhoneNumberDestroyAction;
