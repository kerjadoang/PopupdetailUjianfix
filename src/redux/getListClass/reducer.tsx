import {
  LIST_CLASS_REQUEST,
  LIST_CLASS_SUCCESS,
  LIST_CLASS_FAILED,
  LIST_CLASS_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const listClassReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case LIST_CLASS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_CLASS_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case LIST_CLASS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case LIST_CLASS_DESTROY:
      return state;
    default:
      return state;
  }
};

export default listClassReducer;
