const BASE_NAME = 'CHECK_DIAGNOSTIC_TEST';
export const CHECK_DIAGNOSTIC_TEST_REQUEST = `${BASE_NAME}_REQUEST`;
export const CHECK_DIAGNOSTIC_TEST_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CHECK_DIAGNOSTIC_TEST_FAILED = `${BASE_NAME}_FAILED`;
export const CHECK_DIAGNOSTIC_TEST_DESTROY = `${BASE_NAME}_DESTROY`;

interface checkDiagnosticRequestAction {
  type: typeof CHECK_DIAGNOSTIC_TEST_REQUEST;
}

interface checkDiagnosticSuccessAction {
  type: typeof CHECK_DIAGNOSTIC_TEST_SUCCESS;
  payload: {data: any};
}

interface checkDiagnosticFailedAction {
  type: typeof CHECK_DIAGNOSTIC_TEST_FAILED;
  payload: any;
}

interface checkDiagnosticDestroyAction {
  type: typeof CHECK_DIAGNOSTIC_TEST_DESTROY;
}

export type CHECK_DIAGNOSTIC_TEST_ACTION_TYPES =
  | checkDiagnosticRequestAction
  | checkDiagnosticSuccessAction
  | checkDiagnosticFailedAction
  | checkDiagnosticDestroyAction;
