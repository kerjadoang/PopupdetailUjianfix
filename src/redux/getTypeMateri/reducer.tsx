import {
  TYPE_MATERI_REQUEST,
  TYPE_MATERI_SUCCESS,
  TYPE_MATERI_FAILED,
  TYPE_MATERI_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const typeMateriReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case TYPE_MATERI_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPE_MATERI_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case TYPE_MATERI_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case TYPE_MATERI_DESTROY:
      return state;
    default:
      return state;
  }
};

export default typeMateriReducer;
