import {
  GET_LMS_MATERI_SEKOLAH_DESTROY,
  GET_LMS_MATERI_SEKOLAH_FAILED,
  GET_LMS_MATERI_SEKOLAH_REQUEST,
  GET_LMS_MATERI_SEKOLAH_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getLMSMateriSekolahReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_LMS_MATERI_SEKOLAH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LMS_MATERI_SEKOLAH_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_LMS_MATERI_SEKOLAH_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_LMS_MATERI_SEKOLAH_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getLMSMateriSekolahReducer;
