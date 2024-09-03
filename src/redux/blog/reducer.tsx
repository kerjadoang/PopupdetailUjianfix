import {BLOG_REQUEST, BLOG_SUCCESS, BLOG_FAILED, BLOG_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const BlogReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BLOG_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case BLOG_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case BLOG_DESTROY:
      return state;
    default:
      return state;
  }
};

export default BlogReducer;
