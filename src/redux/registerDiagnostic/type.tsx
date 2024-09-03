const BASE_NAME = 'REGISTER_DIAGNOSTIG_TEST';
export const REGISTER_DIAGNOSTIG_TEST_REQUEST = `${BASE_NAME}_REQUEST`;
export const REGISTER_DIAGNOSTIG_TEST_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const REGISTER_DIAGNOSTIG_TEST_FAILED = `${BASE_NAME}_FAILED`;
export const REGISTER_DIAGNOSTIG_TEST_DESTROY = `${BASE_NAME}_DESTROY`;

interface registerDiagnosticRequestAction {
  type: typeof REGISTER_DIAGNOSTIG_TEST_REQUEST;
}

interface registerDiagnosticSuccessAction {
  type: typeof REGISTER_DIAGNOSTIG_TEST_SUCCESS;
  payload: {data: any};
}

interface registerDiagnosticFailedAction {
  type: typeof REGISTER_DIAGNOSTIG_TEST_FAILED;
  payload: any;
}

interface registerDiagnosticDestroyAction {
  type: typeof REGISTER_DIAGNOSTIG_TEST_DESTROY;
}

export type _IPayloadRegister = {
  email?: string;
  fullname?: string;
  student_phone_number?: string;
  parent_phone_number?: string;
  class_id?: number;
  gender?: string;
  domicile_id?: number;
};

export type REGISTER_DIAGNOSTIG_TEST_ACTION_TYPES =
  | registerDiagnosticRequestAction
  | registerDiagnosticSuccessAction
  | registerDiagnosticFailedAction
  | registerDiagnosticDestroyAction;
