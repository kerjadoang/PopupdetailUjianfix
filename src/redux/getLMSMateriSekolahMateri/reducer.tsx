import {
  GET_LMS_MATERI_SEKOLAH_MATERI_DESTROY,
  GET_LMS_MATERI_SEKOLAH_MATERI_FAILED,
  GET_LMS_MATERI_SEKOLAH_MATERI_REQUEST,
  GET_LMS_MATERI_SEKOLAH_MATERI_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getLMSMateriSekolahMateriReducer = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case GET_LMS_MATERI_SEKOLAH_MATERI_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LMS_MATERI_SEKOLAH_MATERI_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_LMS_MATERI_SEKOLAH_MATERI_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_LMS_MATERI_SEKOLAH_MATERI_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getLMSMateriSekolahMateriReducer;
