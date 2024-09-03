import {
  GET_CLASS_BY_DEGREE_DESTROY,
  GET_CLASS_BY_DEGREE_FAILED,
  GET_CLASS_BY_DEGREE_REQUEST,
  GET_CLASS_BY_DEGREE_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getClassByDegreeReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_CLASS_BY_DEGREE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CLASS_BY_DEGREE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_CLASS_BY_DEGREE_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_CLASS_BY_DEGREE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getClassByDegreeReducer;
