const BASE_NAME = 'FILE';
export const FILE_REQUEST = `${BASE_NAME}_REQUEST`;
export const FILE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const FILE_FAILED = `${BASE_NAME}_FAILED`;
export const FILE_DESTROY = `${BASE_NAME}_DESTROY`;

interface FileRequestAction {
  type: typeof FILE_REQUEST;
}

interface FileSuccessAction {
  type: typeof FILE_SUCCESS;
  payload: {data: any};
}

interface FileFailedAction {
  type: typeof FILE_FAILED;
  payload: any;
}

interface FileDestroyAction {
  type: typeof FILE_DESTROY;
}

export type FILE_ACTION_TYPES =
  | FileRequestAction
  | FileSuccessAction
  | FileFailedAction
  | FileDestroyAction;
