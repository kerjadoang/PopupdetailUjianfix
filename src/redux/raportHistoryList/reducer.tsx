import {
  RAPOR_HISTORY_DESTROY,
  RAPOR_HISTORY_FAILED,
  RAPOR_HISTORY_REQUEST,
  RAPOR_HISTORY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getRaporHistoryListReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case RAPOR_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RAPOR_HISTORY_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case RAPOR_HISTORY_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case RAPOR_HISTORY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getRaporHistoryListReducer;
