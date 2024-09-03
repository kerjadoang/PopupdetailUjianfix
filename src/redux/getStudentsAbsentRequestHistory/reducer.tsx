import {
  GET_STUDENTS_ABSENT_REQUEST_HISTORY_DESTROY,
  GET_STUDENTS_ABSENT_REQUEST_HISTORY_FAILED,
  GET_STUDENTS_ABSENT_REQUEST_HISTORY_REQUEST,
  GET_STUDENTS_ABSENT_REQUEST_HISTORY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getStudentsAbsentRequestHistoryReducer = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case GET_STUDENTS_ABSENT_REQUEST_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STUDENTS_ABSENT_REQUEST_HISTORY_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_STUDENTS_ABSENT_REQUEST_HISTORY_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_STUDENTS_ABSENT_REQUEST_HISTORY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getStudentsAbsentRequestHistoryReducer;
