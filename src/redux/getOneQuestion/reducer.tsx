import {
  CHECK_ONE_QUESTION_REQUEST,
  CHECK_ONE_QUESTION_SUCCESS,
  CHECK_ONE_QUESTION_FAILED,
  CHECK_ONE_QUESTION_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const checkOneQuestionReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CHECK_ONE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_ONE_QUESTION_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case CHECK_ONE_QUESTION_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CHECK_ONE_QUESTION_DESTROY:
      return state;
    default:
      return state;
  }
};

export default checkOneQuestionReducer;
