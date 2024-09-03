import {EXAM_REQUEST, EXAM_SUCCESS, EXAM_FAILED, EXAM_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const examReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case EXAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXAM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case EXAM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case EXAM_DESTROY:
      return state;
    default:
      return state;
  }
};

export default examReducer;
