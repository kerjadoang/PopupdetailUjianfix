import {
  DETAIL_ATTENDANCE_REQUEST,
  DETAIL_ATTENDANCE_SUCCESS,
  DETAIL_ATTENDANCE_FAILED,
  DETAIL_ATTENDANCE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getDetailAttendanceReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case DETAIL_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case DETAIL_ATTENDANCE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case DETAIL_ATTENDANCE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getDetailAttendanceReducer;
