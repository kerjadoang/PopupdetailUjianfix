import {
  SCORING_EXAM_REQUEST,
  SCORING_EXAM_SUCCESS,
  SCORING_EXAM_FAILED,
  SCORING_EXAM_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const scoringExamReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SCORING_EXAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SCORING_EXAM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case SCORING_EXAM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SCORING_EXAM_DESTROY:
      return state;
    default:
      return state;
  }
};

export default scoringExamReducer;
