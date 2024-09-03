import {
  LIST_ACTIVITY_REQUEST,
  LIST_ACTIVITY_SUCCESS,
  LIST_ACTIVITY_FAILED,
  LIST_ACTIVITY_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const listActivityReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case LIST_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_ACTIVITY_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case LIST_ACTIVITY_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case LIST_ACTIVITY_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default listActivityReducer;
