import {
  GET_ROMBEL_WITH_STUDENT_REQUEST_DESTROY,
  GET_ROMBEL_WITH_STUDENT_REQUEST_FAILED,
  GET_ROMBEL_WITH_STUDENT_REQUEST_REQUEST,
  GET_ROMBEL_WITH_STUDENT_REQUEST_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getTeacherClassesInfoReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_ROMBEL_WITH_STUDENT_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ROMBEL_WITH_STUDENT_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ROMBEL_WITH_STUDENT_REQUEST_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ROMBEL_WITH_STUDENT_REQUEST_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getTeacherClassesInfoReducer;
