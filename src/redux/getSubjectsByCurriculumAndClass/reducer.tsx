import {
  GET_SUBJECT_BY_CURRICULUM_AND_CLASS_DESTROY,
  GET_SUBJECT_BY_CURRICULUM_AND_CLASS_FAILED,
  GET_SUBJECT_BY_CURRICULUM_AND_CLASS_REQUEST,
  GET_SUBJECT_BY_CURRICULUM_AND_CLASS_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getSubjectByCurriculumAndClassReducer = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case GET_SUBJECT_BY_CURRICULUM_AND_CLASS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBJECT_BY_CURRICULUM_AND_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_SUBJECT_BY_CURRICULUM_AND_CLASS_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_SUBJECT_BY_CURRICULUM_AND_CLASS_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getSubjectByCurriculumAndClassReducer;
