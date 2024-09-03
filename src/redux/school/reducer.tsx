import {
  SCHOOL_REQUEST,
  SCHOOL_SUCCESS,
  SCHOOL_FAILED,
  SCHOOL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const schoolReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SCHOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SCHOOL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case SCHOOL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SCHOOL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default schoolReducer;
