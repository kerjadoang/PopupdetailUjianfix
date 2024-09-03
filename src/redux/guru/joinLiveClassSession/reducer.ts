import {
  GET_JOIN_LIVE_CLASS_SESSION_REQUEST,
  GET_JOIN_LIVE_CLASS_SESSION_SUCCESS,
  GET_JOIN_LIVE_CLASS_SESSION_FAILED,
  GET_JOIN_LIVE_CLASS_SESSION_DESTROY,
  IJoinLiveClassSessionInitialState,
} from './type';

const initialState: IJoinLiveClassSessionInitialState = {
  loading: false,
  classData: {},
  error: null,
};

const notesReducer = (
  state: IJoinLiveClassSessionInitialState = initialState,
  action: any,
): IJoinLiveClassSessionInitialState => {
  switch (action?.type) {
    case GET_JOIN_LIVE_CLASS_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_JOIN_LIVE_CLASS_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        classData: action.payload.data,
        error: null,
      };
    case GET_JOIN_LIVE_CLASS_SESSION_FAILED:
      return {
        ...state,
        loading: false,
        classData: null,
        error: action.payload,
      };
    case GET_JOIN_LIVE_CLASS_SESSION_DESTROY:
      return {
        ...state,
        loading: false,
        classData: null,
      };

    default:
      return state;
  }
};

export default notesReducer;
