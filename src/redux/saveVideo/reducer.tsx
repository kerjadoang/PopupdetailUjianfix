import {
  SAVE_VIDEO_REQUEST,
  SAVE_VIDEO_SUCCESS,
  SAVE_VIDEO_FAILED,
  SAVE_VIDEO_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const saveVideoReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SAVE_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SAVE_VIDEO_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case SAVE_VIDEO_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SAVE_VIDEO_DESTROY:
      return state;
    default:
      return state;
  }
};

export default saveVideoReducer;
