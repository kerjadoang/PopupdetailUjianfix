const BASE_NAME = 'CS_REKAMAN';
export const CS_REKAMAN_REQUEST = `${BASE_NAME}_REQUEST`;
export const CS_REKAMAN_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CS_REKAMAN_FAILED = `${BASE_NAME}_FAILED`;
export const CS_REKAMAN_DESTROY = `${BASE_NAME}_DESTROY`;

interface ClassSessionRekamanRequestAction {
  type: typeof CS_REKAMAN_REQUEST;
}

interface ClassSessionRekamanSuccessAction {
  type: typeof CS_REKAMAN_SUCCESS;
  payload: {data: any};
}

interface ClassSessionRekamanFailedAction {
  type: typeof CS_REKAMAN_FAILED;
  payload: any;
}

interface ClassSessionRekamanDestroyAction {
  type: typeof CS_REKAMAN_DESTROY;
}

export type CS_REKAMAN_ACTION_TYPES =
  | ClassSessionRekamanRequestAction
  | ClassSessionRekamanSuccessAction
  | ClassSessionRekamanFailedAction
  | ClassSessionRekamanDestroyAction;
