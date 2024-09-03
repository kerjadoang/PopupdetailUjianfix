const BASE_NAME = 'AKM';
export const AKM_REQUEST = `${BASE_NAME}_REQUEST`;
export const AKM_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const AKM_FAILED = `${BASE_NAME}_FAILED`;
export const AKM_DESTROY = `${BASE_NAME}_DESTROY`;

interface AKMRequestAction {
  type: typeof AKM_REQUEST;
}

interface AKMSuccessAction {
  type: typeof AKM_SUCCESS;
  payload: {data: any};
}

interface AKMFailedAction {
  type: typeof AKM_FAILED;
  payload: any;
}

interface AKMDestroyAction {
  type: typeof AKM_DESTROY;
}

export type AKM_ACTION_TYPES =
  | AKMRequestAction
  | AKMSuccessAction
  | AKMFailedAction
  | AKMDestroyAction;
