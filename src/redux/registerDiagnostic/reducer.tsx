import {
  REGISTER_DIAGNOSTIG_TEST_DESTROY,
  REGISTER_DIAGNOSTIG_TEST_FAILED,
  REGISTER_DIAGNOSTIG_TEST_REQUEST,
  REGISTER_DIAGNOSTIG_TEST_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const registerDiagnosticReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case REGISTER_DIAGNOSTIG_TEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_DIAGNOSTIG_TEST_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case REGISTER_DIAGNOSTIG_TEST_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case REGISTER_DIAGNOSTIG_TEST_DESTROY:
      return state;
    default:
      return state;
  }
};

export default registerDiagnosticReducer;
