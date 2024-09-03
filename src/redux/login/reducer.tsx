import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const loginReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case LOGIN_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case LOGIN_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
