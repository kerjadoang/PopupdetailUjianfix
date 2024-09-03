import {
  GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_DESTROY,
  GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_FAILED,
  GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_REQUEST,
  GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getUlanganHarianChapterTestPackage = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getUlanganHarianChapterTestPackage;
