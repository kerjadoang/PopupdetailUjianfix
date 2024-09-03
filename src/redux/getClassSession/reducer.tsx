import {
  CLASS_SESSION_REQUEST,
  CLASS_SESSION_SUCCESS,
  CLASS_SESSION_FAILED,
  CLASS_SESSION_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const classSessionReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CLASS_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CLASS_SESSION_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case CLASS_SESSION_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CLASS_SESSION_DESTROY:
      return state;
    default:
      return state;
  }
};

export default classSessionReducer;
