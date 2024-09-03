import {
  GET_SUBJECTS_REPORT_DESTROY,
  GET_SUBJECTS_REPORT_FAILED,
  GET_SUBJECTS_REPORT_REQUEST,
  GET_SUBJECTS_REPORT_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getSubjectsReportReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_SUBJECTS_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBJECTS_REPORT_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_SUBJECTS_REPORT_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_SUBJECTS_REPORT_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getSubjectsReportReducer;
