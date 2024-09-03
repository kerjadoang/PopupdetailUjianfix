import {
  GET_ACTIVITY_DESTROY,
  GET_ACTIVITY_FAILED,
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getActivityReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ACTIVITY_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ACTIVITY_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ACTIVITY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getActivityReducer;
