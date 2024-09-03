import {
  ROMBEL_REQUEST,
  ROMBEL_SUCCESS,
  ROMBEL_FAILED,
  ROMBEL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const rombelReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ROMBEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ROMBEL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ROMBEL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ROMBEL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default rombelReducer;
