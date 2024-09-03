const BASE_NAME = 'GET_LMS_LIST_UJIAN';
export const GET_LMS_LIST_UJIAN_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_LMS_LIST_UJIAN_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_LMS_LIST_UJIAN_FAILED = `${BASE_NAME}_FAILED`;
export const GET_LMS_LIST_UJIAN_DESTROY = `${BASE_NAME}_DESTROY`;
export const GET_LMS_LIST_UJIAN_RESET = `${BASE_NAME}_RESET`;

interface getLMSListUjianRequestAction {
  type: typeof GET_LMS_LIST_UJIAN_REQUEST;
}

interface getLMSListUjianSuccessAction {
  type: typeof GET_LMS_LIST_UJIAN_SUCCESS;
  payload: {data: any};
}

interface getLMSListUjianFailedAction {
  type: typeof GET_LMS_LIST_UJIAN_FAILED;
  payload: any;
}

interface getLMSListUjianDestroyAction {
  type: typeof GET_LMS_LIST_UJIAN_DESTROY;
}

interface getLMSListUjianResetAction {
  type: typeof GET_LMS_LIST_UJIAN_RESET;
}

export type IFetchGetLMSListUjian = {
  search?: string;
  status: 'scheduled' | 'on_progress' | 'done_scoring';
  subject_id?: [];
  page: number;
  limit: number;
};

export type _IPayloadLMSListUjian = {
  search?: string;
  status?: string[]; // Scheduled, done_scoring
  status_student?: string[];
  subject_id?: any[];
  resetList?: boolean;
  page: number;
  limit: number;
};

export type GET_LMS_LIST_UJIAN_ACTION_TYPES =
  | getLMSListUjianRequestAction
  | getLMSListUjianSuccessAction
  | getLMSListUjianFailedAction
  | getLMSListUjianResetAction
  | getLMSListUjianDestroyAction;

const BASE_NAME_RIWAYAT = 'GET_LMS_LIST_UJIAN_RIWAYAT';
export const GET_LMS_LIST_UJIAN_RIWAYAT_REQUEST = `${BASE_NAME_RIWAYAT}_REQUEST`;
export const GET_LMS_LIST_UJIAN_RIWAYAT_SUCCESS = `${BASE_NAME_RIWAYAT}_SUCCESS`;
export const GET_LMS_LIST_UJIAN_RIWAYAT_FAILED = `${BASE_NAME_RIWAYAT}_FAILED`;
export const GET_LMS_LIST_UJIAN_RIWAYAT_DESTROY = `${BASE_NAME_RIWAYAT}_DESTROY`;

interface getLMSListUjianRiwayatRequestAction {
  type: typeof GET_LMS_LIST_UJIAN_RIWAYAT_REQUEST;
}

interface getLMSListUjianRiwayatSuccessAction {
  type: typeof GET_LMS_LIST_UJIAN_RIWAYAT_SUCCESS;
  payload: {data: any};
}

interface getLMSListUjianRiwayatFailedAction {
  type: typeof GET_LMS_LIST_UJIAN_RIWAYAT_FAILED;
  payload: any;
}

interface getLMSListUjianRiwayatDestroyAction {
  type: typeof GET_LMS_LIST_UJIAN_RIWAYAT_DESTROY;
}

export type GET_LMS_LIST_UJIAN_RIWAYAT_ACTION_TYPES =
  | getLMSListUjianRiwayatRequestAction
  | getLMSListUjianRiwayatSuccessAction
  | getLMSListUjianRiwayatFailedAction
  | getLMSListUjianRiwayatDestroyAction;
