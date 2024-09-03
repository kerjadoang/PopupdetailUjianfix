const BASE_NAME = 'SOAL_VIDEO';
export const SOAL_VIDEO_REQUEST = `${BASE_NAME}_REQUEST`;
export const SOAL_VIDEO_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SOAL_VIDEO_FAILED = `${BASE_NAME}_FAILED`;
export const SOAL_VIDEO_DESTROY = `${BASE_NAME}_DESTROY`;

interface SoalVideoRequestAction {
  type: typeof SOAL_VIDEO_REQUEST;
}

interface SoalVideoSuccessAction {
  type: typeof SOAL_VIDEO_SUCCESS;
  payload: {data: any};
}

interface SoalVideoFailedAction {
  type: typeof SOAL_VIDEO_FAILED;
  payload: any;
}

interface SoalVideoDestroyAction {
  type: typeof SOAL_VIDEO_DESTROY;
}

export type SOAL_VIDEO_ACTION_TYPES =
  | SoalVideoRequestAction
  | SoalVideoSuccessAction
  | SoalVideoFailedAction
  | SoalVideoDestroyAction;
