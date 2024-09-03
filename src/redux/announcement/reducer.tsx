import {
  ANNOUNCEMENT_REQUEST,
  ANNOUNCEMENT_SUCCESS,
  ANNOUNCEMENT_FAILED,
  ANNOUNCEMENT_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const announcementReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ANNOUNCEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ANNOUNCEMENT_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ANNOUNCEMENT_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ANNOUNCEMENT_DESTROY:
      return state;
    default:
      return state;
  }
};

export default announcementReducer;
