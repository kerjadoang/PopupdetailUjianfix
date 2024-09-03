import {
  ERAPORT_SL_REQUEST,
  ERAPORT_SL_SUCCESS,
  ERAPORT_SL_FAILED,
  ERAPORT_SL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const eraportShareListReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ERAPORT_SL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ERAPORT_SL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ERAPORT_SL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ERAPORT_SL_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default eraportShareListReducer;
