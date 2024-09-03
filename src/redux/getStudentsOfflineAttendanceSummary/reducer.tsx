import {
  GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_DESTROY,
  GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_FAILED,
  GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_REQUEST,
  GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getStudentsOfflineAttendanceSummaryReducer = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_STUDENTS_OFFLINE_ATTENDANCE_SUMMARY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getStudentsOfflineAttendanceSummaryReducer;
