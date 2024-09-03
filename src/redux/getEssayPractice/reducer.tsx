import {
  ESSAY_PRACTICE_REQUEST,
  ESSAY_PRACTICE_SUCCESS,
  ESSAY_PRACTICE_FAILED,
  ESSAY_PRACTICE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const essayPracticeReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ESSAY_PRACTICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ESSAY_PRACTICE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ESSAY_PRACTICE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ESSAY_PRACTICE_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default essayPracticeReducer;
