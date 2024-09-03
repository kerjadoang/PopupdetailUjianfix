import {
  SUBJECTS_FAV_REQUEST,
  SUBJECTS_FAV_SUCCESS,
  SUBJECTS_FAV_FAILED,
  SUBJECTS_FAV_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const subjectsFavReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SUBJECTS_FAV_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBJECTS_FAV_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case SUBJECTS_FAV_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SUBJECTS_FAV_DESTROY:
      return state;
    default:
      return state;
  }
};

export default subjectsFavReducer;
