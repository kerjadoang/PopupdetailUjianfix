import {
  FORGET_OTP_REQUEST,
  FORGET_OTP_SUCCESS,
  FORGET_OTP_FAILED,
  FORGET_OTP_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const forgetOtpReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case FORGET_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGET_OTP_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case FORGET_OTP_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case FORGET_OTP_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default forgetOtpReducer;
