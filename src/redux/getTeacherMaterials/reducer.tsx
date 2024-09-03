import {
  GET_TEACHER_MATERIALS_DESTROY,
  GET_TEACHER_MATERIALS_FAILED,
  GET_TEACHER_MATERIALS_REQUEST,
  GET_TEACHER_MATERIALS_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getTeacherMaterialsReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_TEACHER_MATERIALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TEACHER_MATERIALS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_TEACHER_MATERIALS_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_TEACHER_MATERIALS_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getTeacherMaterialsReducer;
