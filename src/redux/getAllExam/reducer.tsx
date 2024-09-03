import {
  GET_ALL_EXAM_DESTROY,
  GET_ALL_EXAM_FAILED,
  GET_ALL_EXAM_REQUEST,
  GET_ALL_EXAM_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getAllExamReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_ALL_EXAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_EXAM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ALL_EXAM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ALL_EXAM_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};

export default getAllExamReducer;
