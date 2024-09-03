import {
  DURATION_SUMMARY_REQUEST,
  DURATION_SUMMARY_SUCCESS,
  DURATION_SUMMARY_FAILED,
  DURATION_SUMMARY_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const durationSummaryReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case DURATION_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DURATION_SUMMARY_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case DURATION_SUMMARY_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case DURATION_SUMMARY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default durationSummaryReducer;
