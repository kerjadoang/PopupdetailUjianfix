const BASE_NAME = 'RAPOR_PREVIEW';
export const RAPOR_PREVIEW_REQUEST = `${BASE_NAME}_REQUEST`;
export const RAPOR_PREVIEW_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const RAPOR_PREVIEW_FAILED = `${BASE_NAME}_FAILED`;
export const RAPOR_PREVIEW_DESTROY = `${BASE_NAME}_DESTROY`;

interface getRaporPreviewRequestAction {
  type: typeof RAPOR_PREVIEW_REQUEST;
}

interface getRaporPreviewSuccessAction {
  type: typeof RAPOR_PREVIEW_SUCCESS;
  payload: {data: any};
}

interface getRaporPreviewFailedAction {
  type: typeof RAPOR_PREVIEW_FAILED;
  payload: any;
}

interface getRaporPreviewDestroyAction {
  type: typeof RAPOR_PREVIEW_DESTROY;
}

export type RAPOR_PREVIEW_ACTION_TYPES =
  | getRaporPreviewRequestAction
  | getRaporPreviewSuccessAction
  | getRaporPreviewFailedAction
  | getRaporPreviewDestroyAction;
