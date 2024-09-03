const BASE_NAME = 'GET_LMS_MATERI_SEKOLAH';
export const GET_LMS_MATERI_SEKOLAH_BAB_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_LMS_MATERI_SEKOLAH_BAB_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_LMS_MATERI_SEKOLAH_BAB_FAILED = `${BASE_NAME}_FAILED`;
export const GET_LMS_MATERI_SEKOLAH_BAB_DESTROY = `${BASE_NAME}_DESTROY`;

interface getLMSMateriSekolahBabRequestAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_BAB_REQUEST;
}

interface getLMSMateriSekolahBabSuccessAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_BAB_SUCCESS;
  payload: {data: any};
}

interface getLMSMateriSekolahBabFailedAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_BAB_FAILED;
  payload: any;
}

interface getLMSMateriSekolahBabDestroyAction {
  type: typeof GET_LMS_MATERI_SEKOLAH_BAB_DESTROY;
}

export type GET_LMS_MATERI_SEKOLAH_BAB_ACTION_TYPES =
  | getLMSMateriSekolahBabRequestAction
  | getLMSMateriSekolahBabSuccessAction
  | getLMSMateriSekolahBabFailedAction
  | getLMSMateriSekolahBabDestroyAction;
