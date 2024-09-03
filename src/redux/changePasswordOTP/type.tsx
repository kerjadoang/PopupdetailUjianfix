const BASE_NAME = 'CHANGE_PASSWORD_OTP';
export const CHANGE_PASSWORD_OTP_REQUEST = `${BASE_NAME}_REQUEST`;
export const CHANGE_PASSWORD_OTP_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CHANGE_PASSWORD_OTP_FAILED = `${BASE_NAME}_FAILED`;
export const CHANGE_PASSWORD_OTP_DESTROY = `${BASE_NAME}_DESTROY`;

interface ChangePasswordOTPRequestAction {
  type: typeof CHANGE_PASSWORD_OTP_REQUEST;
}

interface ChangePasswordOTPSuccessAction {
  type: typeof CHANGE_PASSWORD_OTP_SUCCESS;
  payload: {data: any};
}

interface ChangePasswordOTPFailedAction {
  type: typeof CHANGE_PASSWORD_OTP_FAILED;
  payload: any;
}

interface ChangePasswordOTPDestroyAction {
  type: typeof CHANGE_PASSWORD_OTP_DESTROY;
}

export type CHANGE_PASSWORD_OTP_ACTION_TYPES =
  | ChangePasswordOTPRequestAction
  | ChangePasswordOTPSuccessAction
  | ChangePasswordOTPFailedAction
  | ChangePasswordOTPDestroyAction;
