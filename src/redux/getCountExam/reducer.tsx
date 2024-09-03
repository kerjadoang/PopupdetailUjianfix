import {
  GET_COUNT_EXAM_REQUEST,
  GET_COUNT_EXAM_SUCCESS,
  GET_COUNT_EXAM_FAILED,
  GET_COUNT_EXAM_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getCountExamReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_COUNT_EXAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNT_EXAM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_COUNT_EXAM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_COUNT_EXAM_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getCountExamReducer;
