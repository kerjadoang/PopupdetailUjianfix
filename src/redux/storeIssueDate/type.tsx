const BASE_NAME = 'POST_ISSUE_DATE';
export const POST_ISSUE_DATE_REQUEST = `${BASE_NAME}_REQUEST`;
export const POST_ISSUE_DATE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const POST_ISSUE_DATE_FAILED = `${BASE_NAME}_FAILED`;
export const POST_ISSUE_DATE_DESTROY = `${BASE_NAME}_DESTROY`;

interface storeIssueDateRequestAction {
  type: typeof POST_ISSUE_DATE_REQUEST;
}

interface storeIssueDateSuccessAction {
  type: typeof POST_ISSUE_DATE_SUCCESS;
  payload: {data: any};
}

interface storeIssueDateFailedAction {
  type: typeof POST_ISSUE_DATE_FAILED;
  payload: any;
}

interface storeIssueDateDestroyAction {
  type: typeof POST_ISSUE_DATE_DESTROY;
}

export type _IPayloadIssueDate = {
  id: number;
  academic_phase: number;
  issue_date: string;
};

export type POST_ISSUE_DATE_ACTION_TYPES =
  | storeIssueDateRequestAction
  | storeIssueDateSuccessAction
  | storeIssueDateFailedAction
  | storeIssueDateDestroyAction;
