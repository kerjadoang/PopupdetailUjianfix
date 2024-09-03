import {
  GET_SUBJECTS_BY_USER_CLASS_DESTROY,
  GET_SUBJECTS_BY_USER_CLASS_FAILED,
  GET_SUBJECTS_BY_USER_CLASS_REQUEST,
  GET_SUBJECTS_BY_USER_CLASS_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getSubjectsByUserClassReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_SUBJECTS_BY_USER_CLASS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBJECTS_BY_USER_CLASS_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_SUBJECTS_BY_USER_CLASS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_SUBJECTS_BY_USER_CLASS_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getSubjectsByUserClassReducer;
