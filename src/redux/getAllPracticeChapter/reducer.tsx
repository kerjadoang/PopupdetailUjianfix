import {
  GET_ALL_PRACTICE_CHAPTER_DESTROY,
  GET_ALL_PRACTICE_CHAPTER_FAILED,
  GET_ALL_PRACTICE_CHAPTER_REQUEST,
  GET_ALL_PRACTICE_CHAPTER_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getAllPracticeChapterReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_ALL_PRACTICE_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRACTICE_CHAPTER_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ALL_PRACTICE_CHAPTER_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ALL_PRACTICE_CHAPTER_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getAllPracticeChapterReducer;
