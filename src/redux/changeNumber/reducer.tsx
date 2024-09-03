import {
  CHANGE_NUMBER_REQUEST,
  CHANGE_NUMBER_SUCCESS,
  CHANGE_NUMBER_FAILED,
  CHANGE_NUMBER_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const changeNumberReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CHANGE_NUMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_NUMBER_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case CHANGE_NUMBER_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CHANGE_NUMBER_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default changeNumberReducer;
