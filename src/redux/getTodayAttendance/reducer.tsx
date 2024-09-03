import {
  TODAY_ATTENDANCE_REQUEST,
  TODAY_ATTENDANCE_SUCCESS,
  TODAY_ATTENDANCE_FAILED,
  TODAY_ATTENDANCE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getTodayAttendanceReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case TODAY_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TODAY_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case TODAY_ATTENDANCE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case TODAY_ATTENDANCE_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getTodayAttendanceReducer;
