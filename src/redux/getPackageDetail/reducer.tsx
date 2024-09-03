import {
  PACKAGE_DETAIL_REQUEST,
  PACKAGE_DETAIL_SUCCESS,
  PACKAGE_DETAIL_FAILED,
  PACKAGE_DETAIL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const packageDetailReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PACKAGE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PACKAGE_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case PACKAGE_DETAIL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PACKAGE_DETAIL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default packageDetailReducer;
