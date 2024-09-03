import {
  GET_LIST_PANCASILA_PROJECT_DESTROY,
  GET_LIST_PANCASILA_PROJECT_FAILED,
  GET_LIST_PANCASILA_PROJECT_REQUEST,
  GET_LIST_PANCASILA_PROJECT_SUCCESS,
  GET_HISTORY_PANCASILA_PROJECT_DESTROY,
  GET_HISTORY_PANCASILA_PROJECT_FAILED,
  GET_HISTORY_PANCASILA_PROJECT_REQUEST,
  GET_HISTORY_PANCASILA_PROJECT_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
  isLoadingHistory: false,
  historyData: null,
  nextPage: true,
  historyNextPage: true,
};

const getPancasilaProjectReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_LIST_PANCASILA_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LIST_PANCASILA_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data:
          action.payload.params.page === 0
            ? action.payload.data
            : [...state.data!, ...action.payload.data],
        nextPage: action.payload.nextPage,
      };
    case GET_HISTORY_PANCASILA_PROJECT_SUCCESS:
      return {
        ...state,
        isLoadingHistory: false,
        error: null,
        historyData:
          action.payload.params.page === 0
            ? action.payload.data
            : [...state.historyData!, ...action.payload.data],
        nextPage: true,
      };
    case GET_LIST_PANCASILA_PROJECT_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_LIST_PANCASILA_PROJECT_DESTROY:
      return state;
    case GET_HISTORY_PANCASILA_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_HISTORY_PANCASILA_PROJECT_FAILED:
      return {
        isLoadingHistory: false,
        historyData: [],
        error: action.payload,
      };
    case GET_HISTORY_PANCASILA_PROJECT_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getPancasilaProjectReducer;
