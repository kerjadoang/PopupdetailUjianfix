const BASE_NAME = 'GET_LMS_MATERI_SEKOLAH';
export const GET_LMS_MATERI_SEKOLAH_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_LMS_MATERI_SEKOLAH_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_LMS_MATERI_SEKOLAH_FAILED = `${BASE_NAME}_FAILED`;
export const GET_LMS_MATERI_SEKOLAH_DESTROY = `${BASE_NAME}_DESTROY`;

interface getLMSMateriSekolahRequestAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_REQUEST;
}

interface getLMSMateriSekolahSuccessAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_SUCCESS;
  payload: {data: any};
}

interface getLMSMateriSekolahFailedAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_FAILED;
  payload: any;
}

interface getLMSMateriSekolahDestroyAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_DESTROY;
}

export type GET_LMS_MATERI_SEKOLAH_ACTION_TYPES =
  | getLMSMateriSekolahRequestAction
  | getLMSMateriSekolahSuccessAction
  | getLMSMateriSekolahFailedAction
  | getLMSMateriSekolahDestroyAction;
