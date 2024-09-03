import {
  GET_TEACHER_CLASSES_INFO_DESTROY,
  GET_TEACHER_CLASSES_INFO_FAILED,
  GET_TEACHER_CLASSES_INFO_REQUEST,
  GET_TEACHER_CLASSES_INFO_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getTeacherClassesInfoReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_TEACHER_CLASSES_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TEACHER_CLASSES_INFO_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_TEACHER_CLASSES_INFO_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_TEACHER_CLASSES_INFO_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getTeacherClassesInfoReducer;
