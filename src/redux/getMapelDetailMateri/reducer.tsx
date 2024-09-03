import {
  MAPEL_DM_REQUEST,
  MAPEL_DM_SUCCESS,
  MAPEL_DM_FAILED,
  MAPEL_DM_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const mapelDetailMateriReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case MAPEL_DM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MAPEL_DM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case MAPEL_DM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case MAPEL_DM_DESTROY:
      return state;
    default:
      return state;
  }
};

export default mapelDetailMateriReducer;
