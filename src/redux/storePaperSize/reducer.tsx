import {
  POST_PAPER_SIZE_DESTROY,
  POST_PAPER_SIZE_FAILED,
  POST_PAPER_SIZE_REQUEST,
  POST_PAPER_SIZE_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const storePaperSizeReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case POST_PAPER_SIZE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_PAPER_SIZE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case POST_PAPER_SIZE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case POST_PAPER_SIZE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default storePaperSizeReducer;
