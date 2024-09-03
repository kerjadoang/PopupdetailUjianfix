import {
  ERAPORT_DETAIL_REQUEST,
  ERAPORT_DETAIL_SUCCESS,
  ERAPORT_DETAIL_FAILED,
  ERAPORT_DETAIL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const eraportDetailReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ERAPORT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ERAPORT_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ERAPORT_DETAIL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ERAPORT_DETAIL_DESTROY:
      return {
        loading: false,
        data: null,
        error: '',
      };
    // return state;
    default:
      return state;
  }
};

export default eraportDetailReducer;
