import {
  ROMBEL_CLASS_LIST_DESTROY,
  ROMBEL_CLASS_LIST_FAILED,
  ROMBEL_CLASS_LIST_REQUEST,
  ROMBEL_CLASS_LIST_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getRombelClassListReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ROMBEL_CLASS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ROMBEL_CLASS_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ROMBEL_CLASS_LIST_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ROMBEL_CLASS_LIST_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getRombelClassListReducer;
