import {
  STUDENT_DETAIL_REQUEST,
  STUDENT_DETAIL_SUCCESS,
  STUDENT_DETAIL_FAILED,
  STUDENT_DETAIL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const studentDetailReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case STUDENT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case STUDENT_DETAIL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case STUDENT_DETAIL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default studentDetailReducer;
