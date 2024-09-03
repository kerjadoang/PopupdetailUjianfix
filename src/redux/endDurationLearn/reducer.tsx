import {
  END_DURATION_LEARN_DESTROY,
  END_DURATION_LEARN_FAILED,
  END_DURATION_LEARN_REQUEST,
  END_DURATION_LEARN_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const endDurationLearnReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case END_DURATION_LEARN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case END_DURATION_LEARN_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case END_DURATION_LEARN_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case END_DURATION_LEARN_DESTROY:
      return state;
    default:
      return state;
  }
};

export default endDurationLearnReducer;
