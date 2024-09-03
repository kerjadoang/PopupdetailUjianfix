const BASE_NAME = 'CHANGE_NUMBER_OTP';
export const CHANGE_NUMBER_OTP_REQUEST = `${BASE_NAME}_REQUEST`;
export const CHANGE_NUMBER_OTP_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CHANGE_NUMBER_OTP_FAILED = `${BASE_NAME}_FAILED`;
export const CHANGE_NUMBER_OTP_DESTROY = `${BASE_NAME}_DESTROY`;

interface ChangeNumberOTPRequestAction {
  type: typeof CHANGE_NUMBER_OTP_REQUEST;
}

interface ChangeNumberOTPSuccessAction {
  type: typeof CHANGE_NUMBER_OTP_SUCCESS;
  payload: {data: any};
}

interface ChangeNumberOTPFailedAction {
  type: typeof CHANGE_NUMBER_OTP_FAILED;
  payload: any;
}

interface ChangeNumberOTPDestroyAction {
  type: typeof CHANGE_NUMBER_OTP_DESTROY;
}

export type CHANGE_NUMBER_OTP_ACTION_TYPES =
  | ChangeNumberOTPRequestAction
  | ChangeNumberOTPSuccessAction
  | ChangeNumberOTPFailedAction
  | ChangeNumberOTPDestroyAction;
