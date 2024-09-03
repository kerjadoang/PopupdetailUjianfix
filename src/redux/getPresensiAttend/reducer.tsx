import {
  PRESENSI_ATTEND_REQUEST,
  PRESENSI_ATTEND_SUCCESS,
  PRESENSI_ATTEND_FAILED,
  PRESENSI_ATTEND_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const presensiAttendReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PRESENSI_ATTEND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRESENSI_ATTEND_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case PRESENSI_ATTEND_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PRESENSI_ATTEND_DESTROY:
      return state;
    default:
      return state;
  }
};

export default presensiAttendReducer;
