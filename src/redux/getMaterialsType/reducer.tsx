import {
  GET_MATERIAL_TYPES_DESTROY,
  GET_MATERIAL_TYPES_FAILED,
  GET_MATERIAL_TYPES_REQUEST,
  GET_MATERIAL_TYPES_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getMaterialTypesReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_MATERIAL_TYPES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MATERIAL_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_MATERIAL_TYPES_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_MATERIAL_TYPES_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getMaterialTypesReducer;
