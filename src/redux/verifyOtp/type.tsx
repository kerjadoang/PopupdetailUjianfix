const BASE_NAME = 'VERIFY_OTP';
export const VERIFY_OTP_REQUEST = `${BASE_NAME}_REQUEST`;
export const VERIFY_OTP_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const VERIFY_OTP_FAILED = `${BASE_NAME}_FAILED`;
export const VERIFY_OTP_DESTROY = `${BASE_NAME}_DESTROY`;

interface VerifyOtpRequestAction {
  type: typeof VERIFY_OTP_REQUEST;
}

interface VerifyOtpSuccessAction {
  type: typeof VERIFY_OTP_SUCCESS;
  payload: {data: any};
}

interface VerifyOtpFailedAction {
  type: typeof VERIFY_OTP_FAILED;
  payload: any;
}

interface VerifyOtpDestroyAction {
  type: typeof VERIFY_OTP_DESTROY;
}

export type VERIFY_OTP_ACTION_TYPES =
  | VerifyOtpRequestAction
  | VerifyOtpSuccessAction
  | VerifyOtpFailedAction
  | VerifyOtpDestroyAction;
