import {
  GIVE_ESSAY_SCORE_REQUEST,
  GIVE_ESSAY_SCORE_SUCCESS,
  GIVE_ESSAY_SCORE_FAILED,
  GIVE_ESSAY_SCORE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const sendEssayScoreReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GIVE_ESSAY_SCORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GIVE_ESSAY_SCORE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GIVE_ESSAY_SCORE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GIVE_ESSAY_SCORE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default sendEssayScoreReducer;
