import {
  UPDATE_READ_ALL_ACTIVITY_DESTROY,
  UPDATE_READ_ALL_ACTIVITY_FAILED,
  UPDATE_READ_ALL_ACTIVITY_REQUEST,
  UPDATE_READ_ALL_ACTIVITY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const updateReadAllActivityReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case UPDATE_READ_ALL_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_READ_ALL_ACTIVITY_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case UPDATE_READ_ALL_ACTIVITY_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case UPDATE_READ_ALL_ACTIVITY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default updateReadAllActivityReducer;
