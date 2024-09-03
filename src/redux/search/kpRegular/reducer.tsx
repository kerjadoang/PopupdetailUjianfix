import {
  KpRegularSearchState,
  KP_REGULAR_SEARCH_REQUEST,
  KP_REGULAR_SEARCH_SUCCESS,
  KP_REGULAR_SEARCH_FAILED,
  KP_REGULAR_SEARCH_DESTROY,
} from './type';

const initialState: KpRegularSearchState = {
  loading: false,
  error: null,
  data: {
    total: 0,
    learn: [],
    practice: [],
    test: [],
  },
};

export default (state = initialState, action: any): KpRegularSearchState => {
  switch (action.type) {
    case KP_REGULAR_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case KP_REGULAR_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case KP_REGULAR_SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: initialState.data,
      };
    case KP_REGULAR_SEARCH_DESTROY:
      return initialState;
    default:
      return state;
  }
};
