import {
  DETAIL_ABSENT_REQUEST,
  DETAIL_ABSENT_SUCCESS,
  DETAIL_ABSENT_FAILED,
  DETAIL_ABSENT_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getDetailAbsentReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case DETAIL_ABSENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_ABSENT_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case DETAIL_ABSENT_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case DETAIL_ABSENT_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getDetailAbsentReducer;
