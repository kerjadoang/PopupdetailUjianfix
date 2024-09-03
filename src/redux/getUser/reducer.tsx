import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_DESTROY,
  GET_USER_STORE_TOKEN,
  GET_USER_REFETCH,
} from './type';

const initialState = {
  refetch: false,
  loading: false,
  data: [],
  error: null,
};

const getUserReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_REFETCH:
      return {
        ...state,
        refetch: action.payload,
      };
    case GET_USER_SUCCESS:
      return {
        loading: false,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        error: '',
      };
    case GET_USER_STORE_TOKEN:
      return {
        loading: false,
        data: {
          ...state.data,
          user_token: action.payload,
        },
        error: '',
      };
    case GET_USER_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_USER_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getUserReducer;
