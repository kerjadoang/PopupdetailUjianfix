import {RANK_REQUEST, RANK_SUCCESS, RANK_FAILED, RANK_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const rankReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case RANK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RANK_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case RANK_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case RANK_DESTROY:
      return state;
    default:
      return state;
  }
};

export default rankReducer;
