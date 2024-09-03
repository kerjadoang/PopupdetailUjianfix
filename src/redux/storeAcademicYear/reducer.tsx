import {
  POST_ACADEMIC_YEAR_DESTROY,
  POST_ACADEMIC_YEAR_FAILED,
  POST_ACADEMIC_YEAR_REQUEST,
  POST_ACADEMIC_YEAR_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const storeAcademicYearReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case POST_ACADEMIC_YEAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ACADEMIC_YEAR_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case POST_ACADEMIC_YEAR_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case POST_ACADEMIC_YEAR_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default storeAcademicYearReducer;
