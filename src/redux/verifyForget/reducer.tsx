import {
  VERIFY_FORGET_REQUEST,
  VERIFY_FORGET_SUCCESS,
  VERIFY_FORGET_FAILED,
  VERIFY_FORGET_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const verifyForgetReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case VERIFY_FORGET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_FORGET_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case VERIFY_FORGET_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case VERIFY_FORGET_DESTROY:
      return {
        loading: false,
        data: [],
        error: false,
      };
    default:
      return state;
  }
};

export default verifyForgetReducer;
