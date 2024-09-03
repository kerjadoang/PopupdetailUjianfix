import {
  GET_CURRICULUM_REQUEST,
  GET_CURRICULUM_SUCCESS,
  GET_CURRICULUM_FAILED,
  GET_CURRICULUM_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getCurriculumReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_CURRICULUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CURRICULUM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_CURRICULUM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_CURRICULUM_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getCurriculumReducer;
