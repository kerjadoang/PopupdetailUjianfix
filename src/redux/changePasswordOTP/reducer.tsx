import {
  CHANGE_PASSWORD_OTP_REQUEST,
  CHANGE_PASSWORD_OTP_SUCCESS,
  CHANGE_PASSWORD_OTP_FAILED,
  CHANGE_PASSWORD_OTP_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const changePasswordOTPReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CHANGE_PASSWORD_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASSWORD_OTP_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case CHANGE_PASSWORD_OTP_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CHANGE_PASSWORD_OTP_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default changePasswordOTPReducer;
