import {
  CS_REKAMAN_REQUEST,
  CS_REKAMAN_SUCCESS,
  CS_REKAMAN_FAILED,
  CS_REKAMAN_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const classSessionRekamanReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CS_REKAMAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CS_REKAMAN_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case CS_REKAMAN_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CS_REKAMAN_DESTROY:
      return state;
    default:
      return state;
  }
};

export default classSessionRekamanReducer;
