import {
  GET_RECORD_TASK_DETAIL_DESTROY,
  GET_RECORD_TASK_DETAIL_FAILED,
  GET_RECORD_TASK_DETAIL_REQUEST,
  GET_RECORD_TASK_DETAIL_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getRecordTaskDetailReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_RECORD_TASK_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_RECORD_TASK_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_RECORD_TASK_DETAIL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_RECORD_TASK_DETAIL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getRecordTaskDetailReducer;
