import {
  IMAGE_REQUEST,
  IMAGE_SUCCESS,
  IMAGE_FAILED,
  IMAGE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const imageReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case IMAGE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case IMAGE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case IMAGE_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default imageReducer;
