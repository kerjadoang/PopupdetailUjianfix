import {
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
  VIDEO_FAILED,
  VIDEO_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const videoReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VIDEO_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    case VIDEO_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case VIDEO_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};

export default videoReducer;
