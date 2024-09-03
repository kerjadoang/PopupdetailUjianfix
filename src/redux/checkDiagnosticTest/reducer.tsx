import {
  CHECK_DIAGNOSTIC_TEST_REQUEST,
  CHECK_DIAGNOSTIC_TEST_SUCCESS,
  CHECK_DIAGNOSTIC_TEST_FAILED,
  CHECK_DIAGNOSTIC_TEST_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const checkDiagnosticReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case CHECK_DIAGNOSTIC_TEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_DIAGNOSTIC_TEST_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case CHECK_DIAGNOSTIC_TEST_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case CHECK_DIAGNOSTIC_TEST_DESTROY:
      return state;
    default:
      return state;
  }
};

export default checkDiagnosticReducer;
