const BASE_NAME = 'GET_SUBJECTS_REPORT';
export const GET_SUBJECTS_REPORT_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_SUBJECTS_REPORT_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_SUBJECTS_REPORT_FAILED = `${BASE_NAME}_FAILED`;
export const GET_SUBJECTS_REPORT_DESTROY = `${BASE_NAME}_DESTROY`;

interface getSubjectReportRequestAction {
  type: typeof GET_SUBJECTS_REPORT_REQUEST;
}

interface getSubjectReportSuccessAction {
  type: typeof GET_SUBJECTS_REPORT_SUCCESS;
  payload: {data: any};
}

interface getSubjectReportFailedAction {
  type: typeof GET_SUBJECTS_REPORT_FAILED;
  payload: any;
}

interface getSubjectReportDestroyAction {
  type: typeof GET_SUBJECTS_REPORT_DESTROY;
}

export type GET_SUBJECTS_REPORT_ACTION_TYPES =
  | getSubjectReportRequestAction
  | getSubjectReportSuccessAction
  | getSubjectReportFailedAction
  | getSubjectReportDestroyAction;
