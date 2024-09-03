import {
  MAPEL_REQUEST,
  MAPEL_SUCCESS,
  MAPEL_FAILED,
  MAPEL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const mapelReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case MAPEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MAPEL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case MAPEL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case MAPEL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default mapelReducer;
