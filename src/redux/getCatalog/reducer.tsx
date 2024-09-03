import {
  CATALOG_REQUEST,
  CATALOG_SUCCESS,
  CATALOG_FAILED,
  CATALOG_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const catalogReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CATALOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATALOG_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case CATALOG_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CATALOG_DESTROY:
      return state;
    default:
      return state;
  }
};

export default catalogReducer;
