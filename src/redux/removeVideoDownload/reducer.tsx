import {
  REMOVE_VIDEO_DOWNLOAD_REQUEST,
  REMOVE_VIDEO_DOWNLOAD_SUCCESS,
  REMOVE_VIDEO_DOWNLOAD_FAILED,
  REMOVE_VIDEO_DOWNLOAD_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const removeVideoDownloadReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case REMOVE_VIDEO_DOWNLOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_VIDEO_DOWNLOAD_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case REMOVE_VIDEO_DOWNLOAD_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case REMOVE_VIDEO_DOWNLOAD_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default removeVideoDownloadReducer;
