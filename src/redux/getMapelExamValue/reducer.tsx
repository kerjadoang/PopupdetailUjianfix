import {
  MAPEL_EXAM_VALUE_REQUEST,
  MAPEL_EXAM_VALUE_SUCCESS,
  MAPEL_EXAM_VALUE_FAILED,
  MAPEL_EXAM_VALUE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const mapelExamValueReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case MAPEL_EXAM_VALUE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MAPEL_EXAM_VALUE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case MAPEL_EXAM_VALUE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case MAPEL_EXAM_VALUE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default mapelExamValueReducer;
