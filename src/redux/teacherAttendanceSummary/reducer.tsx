import {
  TEACHER_ATTENDANCE_SUM_DESTROY,
  TEACHER_ATTENDANCE_SUM_FAILED,
  TEACHER_ATTENDANCE_SUM_REQUEST,
  TEACHER_ATTENDANCE_SUM_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getTeacherAttendanceReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case TEACHER_ATTENDANCE_SUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TEACHER_ATTENDANCE_SUM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case TEACHER_ATTENDANCE_SUM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case TEACHER_ATTENDANCE_SUM_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getTeacherAttendanceReducer;
