import {
  GET_TASK_TEACHER_DETAIL_DESTROY,
  GET_TASK_TEACHER_DETAIL_FAILED,
  GET_TASK_TEACHER_DETAIL_REQUEST,
  GET_TASK_TEACHER_DETAIL_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getTaskTeacherDetailReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_TASK_TEACHER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TASK_TEACHER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_TASK_TEACHER_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_TASK_TEACHER_DETAIL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getTaskTeacherDetailReducer;
