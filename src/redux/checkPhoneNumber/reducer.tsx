import {
  CHECK_PHONE_NUMBER_REQUEST,
  CHECK_PHONE_NUMBER_SUCCESS,
  CHECK_PHONE_NUMBER_FAILED,
  CHECK_PHONE_NUMBER_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const checkPhoneNumberReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CHECK_PHONE_NUMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_PHONE_NUMBER_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case CHECK_PHONE_NUMBER_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CHECK_PHONE_NUMBER_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};

export default checkPhoneNumberReducer;
