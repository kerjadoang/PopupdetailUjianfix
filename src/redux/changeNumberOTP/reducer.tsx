import {
  CHANGE_NUMBER_OTP_REQUEST,
  CHANGE_NUMBER_OTP_SUCCESS,
  CHANGE_NUMBER_OTP_FAILED,
  CHANGE_NUMBER_OTP_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const changeNumberOTPReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CHANGE_NUMBER_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_NUMBER_OTP_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case CHANGE_NUMBER_OTP_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CHANGE_NUMBER_OTP_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default changeNumberOTPReducer;
