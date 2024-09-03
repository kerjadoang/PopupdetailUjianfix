import {
  HISTORY_COIN_REQUEST,
  HISTORY_COIN_SUCCESS,
  HISTORY_COIN_FAILED,
  HISTORY_COIN_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const historyCoinReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case HISTORY_COIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HISTORY_COIN_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case HISTORY_COIN_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case HISTORY_COIN_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default historyCoinReducer;
