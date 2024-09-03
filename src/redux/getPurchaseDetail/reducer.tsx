import {
  PURCHASE_DETAIL_REQUEST,
  PURCHASE_DETAIL_SUCCESS,
  PURCHASE_DETAIL_FAILED,
  PURCHASE_DETAIL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const purchaseDetailReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PURCHASE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PURCHASE_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case PURCHASE_DETAIL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PURCHASE_DETAIL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default purchaseDetailReducer;
