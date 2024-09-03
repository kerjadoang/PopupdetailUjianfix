import {
  GET_KUIS_QUESTION_DESTROY,
  GET_KUIS_QUESTION_FAILED,
  GET_KUIS_QUESTION_REQUEST,
  GET_KUIS_QUESTION_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getKuisQuestionReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_KUIS_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_KUIS_QUESTION_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_KUIS_QUESTION_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_KUIS_QUESTION_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getKuisQuestionReducer;
