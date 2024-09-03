import {
  EXAM_DETAIL_REQUEST,
  EXAM_DETAIL_SUCCESS,
  EXAM_DETAIL_FAILED,
  EXAM_DETAIL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const examDetailReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case EXAM_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXAM_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case EXAM_DETAIL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case EXAM_DETAIL_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default examDetailReducer;
