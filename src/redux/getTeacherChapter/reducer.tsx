import {
  GET_TEACHER_CHAPTER_DESTROY,
  GET_TEACHER_CHAPTER_FAILED,
  GET_TEACHER_CHAPTER_REQUEST,
  GET_TEACHER_CHAPTER_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getTeacherChapterReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_TEACHER_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TEACHER_CHAPTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_TEACHER_CHAPTER_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_TEACHER_CHAPTER_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getTeacherChapterReducer;
