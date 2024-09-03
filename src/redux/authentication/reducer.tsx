import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILED,
  AUTHENTICATION_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const authenticationReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case AUTHENTICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case AUTHENTICATION_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case AUTHENTICATION_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
