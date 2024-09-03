import {
  GET_MINI_GAMES_DESTROY,
  GET_MINI_GAMES_FAILED,
  GET_MINI_GAMES_REQUEST,
  GET_MINI_GAMES_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getMiniGameListReducer = (
  state = initialState,
  action: any,
): typeof initialState => {
  switch (action?.type) {
    case GET_MINI_GAMES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MINI_GAMES_SUCCESS:
      return {
        loading: false,
        data: action?.payload?.data,
        error: null,
      };
    case GET_MINI_GAMES_FAILED:
      return {
        loading: false,
        data: [],
        error: action?.payload,
      };
    case GET_MINI_GAMES_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getMiniGameListReducer;
