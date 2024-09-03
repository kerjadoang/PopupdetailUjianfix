import {
  GET_ALL_PRACTICE_CHAPTER_QUESTION_DESTROY,
  GET_ALL_PRACTICE_CHAPTER_QUESTION_FAILED,
  GET_ALL_PRACTICE_CHAPTER_QUESTION_REQUEST,
  GET_ALL_PRACTICE_CHAPTER_QUESTION_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getAllPracticeChapterQuestionReducer = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case GET_ALL_PRACTICE_CHAPTER_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRACTICE_CHAPTER_QUESTION_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ALL_PRACTICE_CHAPTER_QUESTION_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ALL_PRACTICE_CHAPTER_QUESTION_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getAllPracticeChapterQuestionReducer;
