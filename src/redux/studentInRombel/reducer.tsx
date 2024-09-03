import {
  STUDENT_IN_ROMBEL_DESTROY,
  STUDENT_IN_ROMBEL_FAILED,
  STUDENT_IN_ROMBEL_REQUEST,
  STUDENT_IN_ROMBEL_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getStudentInRombelReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case STUDENT_IN_ROMBEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_IN_ROMBEL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case STUDENT_IN_ROMBEL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case STUDENT_IN_ROMBEL_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getStudentInRombelReducer;
