import {
  GET_STUDENTS_ATTENDANCE_CALENDAR_DESTROY,
  GET_STUDENTS_ATTENDANCE_CALENDAR_FAILED,
  GET_STUDENTS_ATTENDANCE_CALENDAR_REQUEST,
  GET_STUDENTS_ATTENDANCE_CALENDAR_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getStudentsAttendanceCalendar = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_STUDENTS_ATTENDANCE_CALENDAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STUDENTS_ATTENDANCE_CALENDAR_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_STUDENTS_ATTENDANCE_CALENDAR_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_STUDENTS_ATTENDANCE_CALENDAR_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getStudentsAttendanceCalendar;
