import {
  UPDATE_READ_ALL_PROMO_DESTROY,
  UPDATE_READ_ALL_PROMO_FAILED,
  UPDATE_READ_ALL_PROMO_REQUEST,
  UPDATE_READ_ALL_PROMO_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const updateReadAllPromoReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case UPDATE_READ_ALL_PROMO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_READ_ALL_PROMO_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case UPDATE_READ_ALL_PROMO_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case UPDATE_READ_ALL_PROMO_DESTROY:
      return state;
    default:
      return state;
  }
};

export default updateReadAllPromoReducer;
