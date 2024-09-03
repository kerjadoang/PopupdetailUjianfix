import {
  GET_ALL_AKM_DESTROY,
  GET_ALL_AKM_FAILED,
  GET_ALL_AKM_REQUEST,
  GET_ALL_AKM_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getAllAkmReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_ALL_AKM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_AKM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ALL_AKM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ALL_AKM_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getAllAkmReducer;
