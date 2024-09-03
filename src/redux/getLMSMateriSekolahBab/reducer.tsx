import {
  GET_LMS_MATERI_SEKOLAH_BAB_DESTROY,
  GET_LMS_MATERI_SEKOLAH_BAB_FAILED,
  GET_LMS_MATERI_SEKOLAH_BAB_REQUEST,
  GET_LMS_MATERI_SEKOLAH_BAB_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getLMSMateriSekolahBabReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_LMS_MATERI_SEKOLAH_BAB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LMS_MATERI_SEKOLAH_BAB_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_LMS_MATERI_SEKOLAH_BAB_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_LMS_MATERI_SEKOLAH_BAB_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getLMSMateriSekolahBabReducer;
