import {
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILED,
  VERIFY_OTP_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const verifyOtpReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case VERIFY_OTP_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case VERIFY_OTP_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default verifyOtpReducer;
