import {
  START_DURATION_LEARN_DESTROY,
  START_DURATION_LEARN_FAILED,
  START_DURATION_LEARN_REQUEST,
  START_DURATION_LEARN_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const startDurationLearnReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case START_DURATION_LEARN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case START_DURATION_LEARN_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case START_DURATION_LEARN_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case START_DURATION_LEARN_DESTROY:
      return state;
    default:
      return state;
  }
};

export default startDurationLearnReducer;
