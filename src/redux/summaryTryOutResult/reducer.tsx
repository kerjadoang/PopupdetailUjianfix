import {
  SUMMARY_TRYOUT_REQUEST,
  SUMMARY_TRYOUT_SUCCESS,
  SUMMARY_TRYOUT_FAILED,
  SUMMARY_TRYOUT_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const summaryTryoutReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SUMMARY_TRYOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUMMARY_TRYOUT_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case SUMMARY_TRYOUT_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SUMMARY_TRYOUT_DESTROY:
      return state;
    default:
      return state;
  }
};

export default summaryTryoutReducer;
