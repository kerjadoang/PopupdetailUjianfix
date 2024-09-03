import {
  GET_ALL_CHILDREN_REQUEST,
  GET_ALL_CHILDREN_SUCCESS,
  GET_ALL_CHILDREN_FAILED,
  GET_ALL_CHILDREN_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getAllChildrenReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_ALL_CHILDREN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CHILDREN_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ALL_CHILDREN_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ALL_CHILDREN_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getAllChildrenReducer;
