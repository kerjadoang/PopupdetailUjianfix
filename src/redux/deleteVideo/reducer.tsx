import {
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAILED,
  DELETE_VIDEO_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const deleteVideoReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case DELETE_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_VIDEO_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case DELETE_VIDEO_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case DELETE_VIDEO_DESTROY:
      return state;
    default:
      return state;
  }
};

export default deleteVideoReducer;
