import {
  PRESENSI_REQUEST,
  PRESENSI_SUCCESS,
  PRESENSI_FAILED,
  PRESENSI_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const presensiReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PRESENSI_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRESENSI_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case PRESENSI_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PRESENSI_DESTROY:
      return state;
    default:
      return state;
  }
};

export default presensiReducer;
