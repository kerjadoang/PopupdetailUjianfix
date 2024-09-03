import {
  GET_PAYMENT_ADMINISTRATIVE_CATEGORY_DESTROY,
  GET_PAYMENT_ADMINISTRATIVE_CATEGORY_FAILED,
  GET_PAYMENT_ADMINISTRATIVE_CATEGORY_REQUEST,
  GET_PAYMENT_ADMINISTRATIVE_CATEGORY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getPaymentAdministrativeCategoryReducer = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case GET_PAYMENT_ADMINISTRATIVE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PAYMENT_ADMINISTRATIVE_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_PAYMENT_ADMINISTRATIVE_CATEGORY_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_PAYMENT_ADMINISTRATIVE_CATEGORY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getPaymentAdministrativeCategoryReducer;
