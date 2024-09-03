import {
  ACADEMIC_YEAR_REQUEST,
  ACADEMIC_YEAR_SUCCESS,
  ACADEMIC_YEAR_FAILED,
  ACADEMIC_YEAR_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const academicYearReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ACADEMIC_YEAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACADEMIC_YEAR_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ACADEMIC_YEAR_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ACADEMIC_YEAR_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default academicYearReducer;
