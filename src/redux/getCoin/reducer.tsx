import {COIN_REQUEST, COIN_SUCCESS, COIN_FAILED, COIN_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const coinReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case COIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COIN_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case COIN_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case COIN_DESTROY:
      return state;
    default:
      return state;
  }
};

export default coinReducer;
