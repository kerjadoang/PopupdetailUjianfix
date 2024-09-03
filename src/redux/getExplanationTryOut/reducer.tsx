import {
  GET_EXPLANATION_TRYOUT_DESTROY,
  GET_EXPLANATION_TRYOUT_FAILED,
  GET_EXPLANATION_TRYOUT_REQUEST,
  GET_EXPLANATION_TRYOUT_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getExplanationTryoutReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_EXPLANATION_TRYOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_EXPLANATION_TRYOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_EXPLANATION_TRYOUT_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_EXPLANATION_TRYOUT_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getExplanationTryoutReducer;
