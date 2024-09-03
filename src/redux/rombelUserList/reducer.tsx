import {
  ROMBEL_USER_LIST_DESTROY,
  ROMBEL_USER_LIST_FAILED,
  ROMBEL_USER_LIST_REQUEST,
  ROMBEL_USER_LIST_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getRombelUserListReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ROMBEL_USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ROMBEL_USER_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ROMBEL_USER_LIST_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ROMBEL_USER_LIST_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getRombelUserListReducer;
