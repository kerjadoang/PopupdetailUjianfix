import {
  SOAL_VIDEO_REQUEST,
  SOAL_VIDEO_SUCCESS,
  SOAL_VIDEO_FAILED,
  SOAL_VIDEO_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getSoalVideoReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SOAL_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SOAL_VIDEO_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case SOAL_VIDEO_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SOAL_VIDEO_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getSoalVideoReducer;
