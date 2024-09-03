import {
  SUBJECTS_REQUEST,
  SUBJECTS_SUCCESS,
  SUBJECTS_FAILED,
  SUBJECTS_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const subjectsReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SUBJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBJECTS_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case SUBJECTS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SUBJECTS_DESTROY:
      return state;
    default:
      return state;
  }
};

export default subjectsReducer;
