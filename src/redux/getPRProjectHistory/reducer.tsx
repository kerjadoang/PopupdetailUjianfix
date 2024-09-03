import {
  GET_PR_PROJECT_HISTORY_DESTROY,
  GET_PR_PROJECT_HISTORY_FAILED,
  GET_PR_PROJECT_HISTORY_REQUEST,
  GET_PR_PROJECT_HISTORY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
  nextPage: true,
};

const getPRProjectHistoryReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_PR_PROJECT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data:
          action.payload.params.offset === 0
            ? action.payload.data
            : [...state.data!, ...action.payload.data],
        nextPage: true,
      };

    case GET_PR_PROJECT_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PR_PROJECT_HISTORY_FAILED:
      return {
        ...state,
        loading: false,
        data:
          action.payload.params.offset === 0
            ? []
            : {
                ...state.data,
                data: [...(state.data?.data as any)],
              },
        error: action.payload,
      };
    case GET_PR_PROJECT_HISTORY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getPRProjectHistoryReducer;
