import {
  BLOGD_REQUEST,
  BLOGD_SUCCESS,
  BLOGD_FAILED,
  BLOGD_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const BlogDReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case BLOGD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BLOGD_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case BLOGD_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case BLOGD_DESTROY:
      return state;
    default:
      return state;
  }
};

export default BlogDReducer;
