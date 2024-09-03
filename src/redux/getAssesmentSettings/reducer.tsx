import {
  ASSESMENT_SET_REQUEST,
  ASSESMENT_SET_SUCCESS,
  ASSESMENT_SET_FAILED,
  ASSESMENT_SET_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const assesmentSetReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ASSESMENT_SET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ASSESMENT_SET_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ASSESMENT_SET_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ASSESMENT_SET_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default assesmentSetReducer;
