import {FILE_REQUEST, FILE_SUCCESS, FILE_FAILED, FILE_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const fileReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case FILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FILE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case FILE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case FILE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default fileReducer;
