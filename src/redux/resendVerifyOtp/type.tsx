const BASE_NAME = 'RESEND_VERIFY_OTP';
export const RESEND_VERIFY_OTP_REQUEST = `${BASE_NAME}_REQUEST`;
export const RESEND_VERIFY_OTP_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const RESEND_VERIFY_OTP_FAILED = `${BASE_NAME}_FAILED`;
export const RESEND_VERIFY_OTP_DESTROY = `${BASE_NAME}_DESTROY`;

interface ResendVerifyOtpRequestAction {
  type: typeof RESEND_VERIFY_OTP_REQUEST;
}

interface ResendVerifyOtpSuccessAction {
  type: typeof RESEND_VERIFY_OTP_SUCCESS;
  payload: {data: any};
}

interface ResendVerifyOtpFailedAction {
  type: typeof RESEND_VERIFY_OTP_FAILED;
  payload: any;
}

interface ResendVerifyOtpDestroyAction {
  type: typeof RESEND_VERIFY_OTP_DESTROY;
}

export type RESEND_VERIFY_OTP_ACTION_TYPES =
  | ResendVerifyOtpRequestAction
  | ResendVerifyOtpSuccessAction
  | ResendVerifyOtpFailedAction
  | ResendVerifyOtpDestroyAction;
