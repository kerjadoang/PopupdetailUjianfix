const BASE_NAME = 'BLOGD';
export const BLOGD_REQUEST = `${BASE_NAME}_REQUEST`;
export const BLOGD_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const BLOGD_FAILED = `${BASE_NAME}_FAILED`;
export const BLOGD_DESTROY = `${BASE_NAME}_DESTROY`;

interface BlogDRequestAction {
  type: typeof BLOGD_REQUEST;
}

interface BlogDSuccessAction {
  type: typeof BLOGD_SUCCESS;
  payload: {data: any};
}

interface BlogDFailedAction {
  type: typeof BLOGD_FAILED;
  payload: any;
}

interface BlogDDestroyAction {
  type: typeof BLOGD_DESTROY;
}

export type BLOGD_ACTION_TYPES =
  | BlogDRequestAction
  | BlogDSuccessAction
  | BlogDFailedAction
  | BlogDDestroyAction;
