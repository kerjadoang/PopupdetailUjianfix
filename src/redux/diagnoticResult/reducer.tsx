import {
  DIAGNOTIC_RESULT_MAJORS_DESTROY,
  DIAGNOTIC_RESULT_MAJORS_SUCCESS,
  DIAGNOTIC_RESULT_PROFESSION_DESTROY,
  DIAGNOTIC_RESULT_PROFESSION_SUCCESS,
  DIAGNOTIC_RESULT_MAJORS,
  DIAGNOTIC_RESULT_PROFESSION,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
  profession: null,
  majors: [],
};

const diagnoticResultReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case DIAGNOTIC_RESULT_PROFESSION_SUCCESS:
      return {
        ...state,
        profession: action.payload,
        majors: action.payload === state.profession ? state.majors : [],
      };
    case DIAGNOTIC_RESULT_PROFESSION:
      return {
        ...state,
        profession: state.profession,
      };
    case DIAGNOTIC_RESULT_PROFESSION_DESTROY:
      return state;
    case DIAGNOTIC_RESULT_MAJORS_SUCCESS:
      return {
        ...state,
        majors: action.payload,
      };
    case DIAGNOTIC_RESULT_MAJORS:
      return {
        ...state,
        majors: state.majors,
      };
    case DIAGNOTIC_RESULT_MAJORS_DESTROY:
      return state;
    default:
      return state;
  }
};

export default diagnoticResultReducer;
