import {TAGS_REQUEST, TAGS_SUCCESS, TAGS_FAILED, TAGS_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const tagsReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case TAGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TAGS_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case TAGS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case TAGS_DESTROY:
      return state;
    default:
      return state;
  }
};

export default tagsReducer;
