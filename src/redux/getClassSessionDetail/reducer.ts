import {
  CS_DETAIL_REQUEST,
  CS_DETAIL_SUCCESS,
  CS_DETAIL_FAILED,
  CS_DETAIL_DESTROY,
  IInitialStateGetClassSession,
} from './type';

const initialState: IInitialStateGetClassSession = {
  loading: false,
  data: null,
  error: null,
};

const classSessionDetailReducer = (
  state = initialState,
  action: any,
): IInitialStateGetClassSession => {
  switch (action?.type) {
    case CS_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CS_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case CS_DETAIL_FAILED:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case CS_DETAIL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default classSessionDetailReducer;
