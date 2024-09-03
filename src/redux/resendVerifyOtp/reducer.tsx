import {
  RESEND_VERIFY_OTP_REQUEST,
  RESEND_VERIFY_OTP_SUCCESS,
  RESEND_VERIFY_OTP_FAILED,
  RESEND_VERIFY_OTP_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const resendVerifyOtpReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case RESEND_VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESEND_VERIFY_OTP_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case RESEND_VERIFY_OTP_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case RESEND_VERIFY_OTP_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default resendVerifyOtpReducer;
