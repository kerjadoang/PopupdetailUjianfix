import {
  REWARD_REQUEST,
  REWARD_SUCCESS,
  REWARD_FAILED,
  REWARD_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const rewardReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case REWARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REWARD_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case REWARD_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case REWARD_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default rewardReducer;
