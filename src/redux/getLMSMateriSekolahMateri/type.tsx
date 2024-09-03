const BASE_NAME = 'GET_LMS_MATERI_SEKOLAH';
export const GET_LMS_MATERI_SEKOLAH_MATERI_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_LMS_MATERI_SEKOLAH_MATERI_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_LMS_MATERI_SEKOLAH_MATERI_FAILED = `${BASE_NAME}_FAILED`;
export const GET_LMS_MATERI_SEKOLAH_MATERI_DESTROY = `${BASE_NAME}_DESTROY`;

interface getLMSMateriSekolahMateriRequestAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_MATERI_REQUEST;
}

interface getLMSMateriSekolahMateriSuccessAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_MATERI_SUCCESS;
  payload: {data: any};
}

interface getLMSMateriSekolahMateriFailedAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_MATERI_FAILED;
  payload: any;
}

interface getLMSMateriSekolahMateriDestroyAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_MATERI_DESTROY;
}

export type GET_LMS_MATERI_SEKOLAH_MATERI_ACTION_TYPES =
  | getLMSMateriSekolahMateriRequestAction
  | getLMSMateriSekolahMateriSuccessAction
  | getLMSMateriSekolahMateriFailedAction
  | getLMSMateriSekolahMateriDestroyAction;
