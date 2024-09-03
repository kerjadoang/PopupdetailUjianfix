import {
  CHANGE_FORGET_PASSWORD_REQUEST,
  CHANGE_FORGET_PASSWORD_SUCCESS,
  CHANGE_FORGET_PASSWORD_FAILED,
  CHANGE_FORGET_PASSWORD_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const changeForgetPasswordReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CHANGE_FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_FORGET_PASSWORD_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case CHANGE_FORGET_PASSWORD_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CHANGE_FORGET_PASSWORD_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};

export default changeForgetPasswordReducer;
