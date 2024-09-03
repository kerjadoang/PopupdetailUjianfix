const BASE_NAME_TERJAWAB = 'GET_TERJAWAB';
export const GET_TERJAWAB_REQUEST = `${BASE_NAME_TERJAWAB}_REQUEST`;
export const GET_TERJAWAB_SUCCESS = `${BASE_NAME_TERJAWAB}_SUCCESS`;
export const GET_TERJAWAB_FAILED = `${BASE_NAME_TERJAWAB}_FAILED`;
export const GET_TERJAWAB_DESTROY = `${BASE_NAME_TERJAWAB}_DESTROY`;

const BASE_NAME_BELUM_DIJAWAB = 'GET_BELUM_DIJAWAB';
export const GET_BELUM_DIJAWAB_REQUEST = `${BASE_NAME_BELUM_DIJAWAB}_REQUEST`;
export const GET_BELUM_DIJAWAB_SUCCESS = `${BASE_NAME_BELUM_DIJAWAB}_SUCCESS`;
export const GET_BELUM_DIJAWAB_FAILED = `${BASE_NAME_BELUM_DIJAWAB}_FAILED`;
export const GET_BELUM_DIJAWAB_DESTROY = `${BASE_NAME_BELUM_DIJAWAB}_DESTROY`;

const BASE_NAME_TIDAK_SESUAI = 'GET_TIDAK_SESUAI';
export const GET_TIDAK_SESUAI_REQUEST = `${BASE_NAME_TIDAK_SESUAI}_REQUEST`;
export const GET_TIDAK_SESUAI_SUCCESS = `${BASE_NAME_TIDAK_SESUAI}_SUCCESS`;
export const GET_TIDAK_SESUAI_FAILED = `${BASE_NAME_TIDAK_SESUAI}_FAILED`;
export const GET_TIDAK_SESUAI_DESTROY = `${BASE_NAME_TIDAK_SESUAI}_DESTROY`;

interface getTerjawabRequestAction {
  type: typeof GET_TERJAWAB_REQUEST;
}
interface getTerjawabSuccessAction {
  type: typeof GET_TERJAWAB_SUCCESS;
  payload: {data: any};
}
interface getTerjawabFailedAction {
  type: typeof GET_TERJAWAB_FAILED;
  payload: any;
}
interface getTerjawabDestroyAction {
  type: typeof GET_TERJAWAB_DESTROY;
}

interface getBelumDijawabRequestAction {
  type: typeof GET_BELUM_DIJAWAB_REQUEST;
}
interface getBelumDijawabSuccessAction {
  type: typeof GET_BELUM_DIJAWAB_SUCCESS;
  payload: {data: any};
}
interface getBelumDijawabFailedAction {
  type: typeof GET_BELUM_DIJAWAB_FAILED;
  payload: any;
}
interface getBelumDijawabDestroyAction {
  type: typeof GET_BELUM_DIJAWAB_DESTROY;
}

interface getTidakSesuaiRequestAction {
  type: typeof GET_TIDAK_SESUAI_REQUEST;
}
interface getTidakSesuaiSuccessAction {
  type: typeof GET_TIDAK_SESUAI_SUCCESS;
  payload: {data: any};
}
interface getTidakSesuaiFailedAction {
  type: typeof GET_TIDAK_SESUAI_FAILED;
  payload: any;
}
interface getTidakSesuaiDestroyAction {
  type: typeof GET_TIDAK_SESUAI_DESTROY;
}

export type GET_TERJAWAB_ACTION_TYPES =
  | getTerjawabRequestAction
  | getTerjawabSuccessAction
  | getTerjawabFailedAction
  | getTerjawabDestroyAction;

export type GET_BELUM_DIJAWAB_ACTION_TYPES =
  | getBelumDijawabRequestAction
  | getBelumDijawabSuccessAction
  | getBelumDijawabFailedAction
  | getBelumDijawabDestroyAction;

export type GET_TIDAK_SESUAI_ACTION_TYPES =
  | getTidakSesuaiRequestAction
  | getTidakSesuaiSuccessAction
  | getTidakSesuaiFailedAction
  | getTidakSesuaiDestroyAction;

export interface IGetHistoryTanyaParam extends IBasePaginationFilter {}

export interface IGetTidakSesuaiParam {
  note_id: any;
}

export interface IHistoryTanyaResponseData {
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ID?: number;
  name?: string;
  image?: string;
  subject_id?: number;
  Subject?: Subject;
  chapter_id?: number;
  Chapter?: Chapter;
  coin?: number;
  status?: string;
  tanya_type?: string;
  is_read?: boolean;
  created_by?: number;
  answer?: HistoryAnswer;
  note?: string;
  path_url?: string;
  DeletedAt?: null;
}

export interface HistoryAnswer {
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ID?: number;
  name?: string;
  image?: string;
  note?: string;
  tanya_id?: number;
  created_by?: number;
  user?: User;
  DeletedAt?: null;
  path_url?: string;
}

export interface User {
  id?: number;
  user_type_id?: number;
  class_id?: number;
  username?: string;
  gender?: string;
  phone_number?: string;
  full_name?: string;
  max_password_failed?: number;
  active?: boolean;
  max_otp_failed?: number;
  max_request_otp?: number;
  attempted_request_after_failed?: number;
  avatar?: string;
  xp?: number;
}

export interface Chapter {
  id?: number;
  subject_id?: number;
  name?: string;
  is_active?: boolean;
  order?: number;
}

export interface Subject {
  id?: number;
  class_id?: number;
  curriculum_id?: number;
  name?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  coin_default?: number;
  module_type?: string;
  class?: Class;
  curriculum?: Curriculum;
}

export interface Class {
  id?: number;
  degree_id?: number;
  major_id?: number;
  name?: string;
  order?: number;
}

export interface Curriculum {
  id?: number;
  name?: string;
  image?: string;
}

export interface IHistoryTanyaInitialState {
  loadingList: boolean;
  terjawab: IGetHistoryTanyaResponse | null;
  belumDijawab: IGetHistoryTanyaResponse | null;
  tidakSesuai: IGetHistoryTanyaResponse | null;
  historyTanyaDetail: IGetHistoryTanyaDetailResponse | null;
  terjawabNextPage: boolean;
  belumDijawabNextPage: boolean;
  tidakSesuaiNextPage: boolean;
  error: null;
}

export type IGetHistoryTanyaResponse = IBaseResponseData<
  IHistoryTanyaResponseData[]
>;

export type IGetHistoryTanyaDetailResponse =
  IBaseResponseData<IHistoryTanyaResponseData>;
