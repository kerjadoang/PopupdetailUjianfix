import {
  RECORD_FILTER_DESTROY,
  RECORD_FILTER_FAILED,
  RECORD_FILTER_REQUEST,
  RECORD_FILTER_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getRecordFilterReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case RECORD_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RECORD_FILTER_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case RECORD_FILTER_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case RECORD_FILTER_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getRecordFilterReducer;
