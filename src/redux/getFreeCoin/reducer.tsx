import {
  FRCOIN_REQUEST,
  FRCOIN_SUCCESS,
  FRCOIN_FAILED,
  FRCOIN_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const freeCoinReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case FRCOIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FRCOIN_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case FRCOIN_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case FRCOIN_DESTROY:
      return state;
    default:
      return state;
  }
};

export default freeCoinReducer;
