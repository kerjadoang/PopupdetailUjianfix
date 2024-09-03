const BASE_NAME = 'FORGET_OTP';
export const FORGET_OTP_REQUEST = `${BASE_NAME}_REQUEST`;
export const FORGET_OTP_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const FORGET_OTP_FAILED = `${BASE_NAME}_FAILED`;
export const FORGET_OTP_DESTROY = `${BASE_NAME}_DESTROY`;

interface ForgetOtpRequestAction {
  type: typeof FORGET_OTP_REQUEST;
}

interface ForgetOtpSuccessAction {
  type: typeof FORGET_OTP_SUCCESS;
  payload: {data: any};
}

interface ForgetOtpFailedAction {
  type: typeof FORGET_OTP_FAILED;
  payload: any;
}

interface ForgetOtpDestroyAction {
  type: typeof FORGET_OTP_DESTROY;
}

export type FORGET_OTP_ACTION_TYPES =
  | ForgetOtpRequestAction
  | ForgetOtpSuccessAction
  | ForgetOtpFailedAction
  | ForgetOtpDestroyAction;
