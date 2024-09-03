import {
  UPDATE_SUBJECTS_FAVORITE_DESTROY,
  UPDATE_SUBJECTS_FAVORITE_FAILED,
  UPDATE_SUBJECTS_FAVORITE_REQUEST,
  UPDATE_SUBJECTS_FAVORITE_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getSubjectsByUserClassReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case UPDATE_SUBJECTS_FAVORITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SUBJECTS_FAVORITE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case UPDATE_SUBJECTS_FAVORITE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case UPDATE_SUBJECTS_FAVORITE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getSubjectsByUserClassReducer;
