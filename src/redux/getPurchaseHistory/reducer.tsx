import {
  PURCHASE_REQUEST,
  PURCHASE_SUCCESS,
  PURCHASE_FAILED,
  PURCHASE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const purchaseReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PURCHASE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case PURCHASE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PURCHASE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default purchaseReducer;
