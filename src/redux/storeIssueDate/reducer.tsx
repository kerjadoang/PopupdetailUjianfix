import {
  POST_ISSUE_DATE_DESTROY,
  POST_ISSUE_DATE_FAILED,
  POST_ISSUE_DATE_REQUEST,
  POST_ISSUE_DATE_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const storeIssueDateReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case POST_ISSUE_DATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ISSUE_DATE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case POST_ISSUE_DATE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case POST_ISSUE_DATE_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default storeIssueDateReducer;
