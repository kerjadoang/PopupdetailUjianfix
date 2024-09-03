import {
  PRESENSI_ABSENT_REQUEST,
  PRESENSI_ABSENT_SUCCESS,
  PRESENSI_ABSENT_FAILED,
  PRESENSI_ABSENT_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const presensiAbsentReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PRESENSI_ABSENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRESENSI_ABSENT_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case PRESENSI_ABSENT_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PRESENSI_ABSENT_DESTROY:
      return state;
    default:
      return state;
  }
};

export default presensiAbsentReducer;
