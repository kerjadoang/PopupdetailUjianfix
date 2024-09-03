import {
  PROMO_REQUEST,
  PROMO_SUCCESS,
  PROMO_FAILED,
  PROMO_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const promoReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PROMO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROMO_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case PROMO_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PROMO_DESTROY:
      return state;
    default:
      return state;
  }
};

export default promoReducer;
