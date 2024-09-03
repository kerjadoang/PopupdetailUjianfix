import {
  LEADERBOARD_TRYOUT_REQUEST,
  LEADERBOARD_TRYOUT_SUCCESS,
  LEADERBOARD_TRYOUT_FAILED,
  LEADERBOARD_TRYOUT_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const leaderboardTryoutReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case LEADERBOARD_TRYOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LEADERBOARD_TRYOUT_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case LEADERBOARD_TRYOUT_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case LEADERBOARD_TRYOUT_DESTROY:
      return state;
    default:
      return state;
  }
};

export default leaderboardTryoutReducer;
