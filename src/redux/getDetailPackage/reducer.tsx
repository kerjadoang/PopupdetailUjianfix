import {
  DETAIL_PACKAGE_REQUEST,
  DETAIL_PACKAGE_SUCCESS,
  DETAIL_PACKAGE_FAILED,
  DETAIL_PACKAGE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const detailPackageReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case DETAIL_PACKAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_PACKAGE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case DETAIL_PACKAGE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case DETAIL_PACKAGE_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};

export default detailPackageReducer;
