import {
  STUDENT_YEARLY_ATTENDANCE_REQUEST,
  STUDENT_YEARLY_ATTENDANCE_SUCCESS,
  STUDENT_YEARLY_ATTENDANCE_FAILED,
  STUDENT_YEARLY_ATTENDANCE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const studentYearlyAttendanceReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case STUDENT_YEARLY_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_YEARLY_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case STUDENT_YEARLY_ATTENDANCE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case STUDENT_YEARLY_ATTENDANCE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default studentYearlyAttendanceReducer;
