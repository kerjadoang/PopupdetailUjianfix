const BASE_NAME = 'RECORD_FILTER';
export const RECORD_FILTER_REQUEST = `${BASE_NAME}_REQUEST`;
export const RECORD_FILTER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const RECORD_FILTER_FAILED = `${BASE_NAME}_FAILED`;
export const RECORD_FILTER_DESTROY = `${BASE_NAME}_DESTROY`;

interface recordFilterRequestAction {
  type: typeof RECORD_FILTER_REQUEST;
}

interface recordFilterSuccessAction {
  type: typeof RECORD_FILTER_SUCCESS;
  payload: {data: any};
}

interface recordFilterFailedAction {
  type: typeof RECORD_FILTER_FAILED;
  payload: any;
}

interface recordFilterDestroyAction {
  type: typeof RECORD_FILTER_DESTROY;
}

export type _IPayloadRecordFilter = {
  search: string;
  materi_video: any;
  mata_pelajaran: any;
  tanggal_awal: string;
  tanggal_akhir: string;
  diunduh: boolean;
};

export type RECORD_FILTER_ACTION_TYPES =
  | recordFilterRequestAction
  | recordFilterSuccessAction
  | recordFilterFailedAction
  | recordFilterDestroyAction;
