import {
  GET_ULANGAN_HARIAN_CHAPTER_DESTROY,
  GET_ULANGAN_HARIAN_CHAPTER_FAILED,
  GET_ULANGAN_HARIAN_CHAPTER_REQUEST,
  GET_ULANGAN_HARIAN_CHAPTER_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getUlanganHarianChapter = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_ULANGAN_HARIAN_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ULANGAN_HARIAN_CHAPTER_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ULANGAN_HARIAN_CHAPTER_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ULANGAN_HARIAN_CHAPTER_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getUlanganHarianChapter;
