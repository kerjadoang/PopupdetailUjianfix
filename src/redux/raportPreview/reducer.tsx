import {
  RAPOR_PREVIEW_DESTROY,
  RAPOR_PREVIEW_FAILED,
  RAPOR_PREVIEW_REQUEST,
  RAPOR_PREVIEW_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  code: 0,
  error: null,
};

const getRaporPreviewReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case RAPOR_PREVIEW_REQUEST:
      return {
        ...state,
        code: 0,
        loading: true,
      };
    case RAPOR_PREVIEW_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        code: 100,
        error: '',
      };
    case RAPOR_PREVIEW_FAILED:
      return {
        loading: false,
        data: [],
        code: 400,
        error: action.payload,
      };
    case RAPOR_PREVIEW_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getRaporPreviewReducer;
