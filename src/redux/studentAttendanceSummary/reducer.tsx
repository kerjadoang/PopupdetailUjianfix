import {
  STUDENT_ATTENDANCE_SUM_DESTROY,
  STUDENT_ATTENDANCE_SUM_FAILED,
  STUDENT_ATTENDANCE_SUM_REQUEST,
  STUDENT_ATTENDANCE_SUM_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getStudentAttendanceReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case STUDENT_ATTENDANCE_SUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_ATTENDANCE_SUM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case STUDENT_ATTENDANCE_SUM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case STUDENT_ATTENDANCE_SUM_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getStudentAttendanceReducer;
