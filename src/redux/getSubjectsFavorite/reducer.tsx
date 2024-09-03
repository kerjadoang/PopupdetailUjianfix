import {
  GET_SUBJECTS_FAVORITE_DESTROY,
  GET_SUBJECTS_FAVORITE_FAILED,
  GET_SUBJECTS_FAVORITE_REQUEST,
  GET_SUBJECTS_FAVORITE_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getSubjectsFavoriteReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_SUBJECTS_FAVORITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBJECTS_FAVORITE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_SUBJECTS_FAVORITE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_SUBJECTS_FAVORITE_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getSubjectsFavoriteReducer;
