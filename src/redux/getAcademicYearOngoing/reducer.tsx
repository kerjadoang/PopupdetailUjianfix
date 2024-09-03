import {
  ACADEMIC_YEAR_ONGOING_REQUEST,
  ACADEMIC_YEAR_ONGOING_SUCCESS,
  ACADEMIC_YEAR_ONGOING_FAILED,
  ACADEMIC_YEAR_ONGOING_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const academicYearOngoingReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ACADEMIC_YEAR_ONGOING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACADEMIC_YEAR_ONGOING_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ACADEMIC_YEAR_ONGOING_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ACADEMIC_YEAR_ONGOING_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default academicYearOngoingReducer;
