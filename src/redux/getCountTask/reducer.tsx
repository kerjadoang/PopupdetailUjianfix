import {
  GET_COUNT_TASK_REQUEST,
  GET_COUNT_TASK_SUCCESS,
  GET_COUNT_TASK_FAILED,
  GET_COUNT_TASK_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getCountTaskReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_COUNT_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNT_TASK_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_COUNT_TASK_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_COUNT_TASK_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getCountTaskReducer;
