import {
  GET_PROMO_DESTROY,
  GET_PROMO_FAILED,
  GET_PROMO_REQUEST,
  GET_PROMO_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getPromoReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_PROMO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROMO_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_PROMO_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_PROMO_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getPromoReducer;
