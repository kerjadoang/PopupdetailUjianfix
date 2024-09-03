const BASE_NAME = 'REMOVE_VIDEO_DOWNLOAD_OTP';
export const REMOVE_VIDEO_DOWNLOAD_REQUEST = `${BASE_NAME}_REQUEST`;
export const REMOVE_VIDEO_DOWNLOAD_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const REMOVE_VIDEO_DOWNLOAD_FAILED = `${BASE_NAME}_FAILED`;
export const REMOVE_VIDEO_DOWNLOAD_DESTROY = `${BASE_NAME}_DESTROY`;

interface RemoveVideoDownloadRequestAction {
  type: typeof REMOVE_VIDEO_DOWNLOAD_REQUEST;
}

interface RemoveVideoDownloadSuccessAction {
  type: typeof REMOVE_VIDEO_DOWNLOAD_SUCCESS;
  payload: {data: any};
}

interface RemoveVideoDownloadFailedAction {
  type: typeof REMOVE_VIDEO_DOWNLOAD_FAILED;
  payload: any;
}

interface RemoveVideoDownloadDestroyAction {
  type: typeof REMOVE_VIDEO_DOWNLOAD_DESTROY;
}

export type REMOVE_VIDEO_DOWNLOAD_ACTION_TYPES =
  | RemoveVideoDownloadRequestAction
  | RemoveVideoDownloadSuccessAction
  | RemoveVideoDownloadFailedAction
  | RemoveVideoDownloadDestroyAction;
