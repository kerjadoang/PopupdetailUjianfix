import {
  PUT_IGNORE_ABSENT_REQUEST_DESTROY,
  PUT_IGNORE_ABSENT_REQUEST_FAILED,
  PUT_IGNORE_ABSENT_REQUEST_REQUEST,
  PUT_IGNORE_ABSENT_REQUEST_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const putIgnoreAbsentRequestReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PUT_IGNORE_ABSENT_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PUT_IGNORE_ABSENT_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case PUT_IGNORE_ABSENT_REQUEST_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PUT_IGNORE_ABSENT_REQUEST_DESTROY:
      return state;
    default:
      return state;
  }
};

export default putIgnoreAbsentRequestReducer;
