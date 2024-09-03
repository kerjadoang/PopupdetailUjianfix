const BASE_NAME_ALL_NOTES = 'GET_ALL_NOTES';
export const GET_ALL_NOTES_REQUEST = `${BASE_NAME_ALL_NOTES}_REQUEST`;
export const GET_ALL_NOTES_SUCCESS = `${BASE_NAME_ALL_NOTES}_SUCCESS`;
export const GET_ALL_NOTES_FAILED = `${BASE_NAME_ALL_NOTES}_FAILED`;
export const GET_ALL_NOTES_DESTROY = `${BASE_NAME_ALL_NOTES}_DESTROY`;

const BASE_NAME_SHARED_NOTES = 'GET_SHARED_NOTES';
export const GET_SHARED_NOTES_REQUEST = `${BASE_NAME_SHARED_NOTES}_REQUEST`;
export const GET_SHARED_NOTES_SUCCESS = `${BASE_NAME_SHARED_NOTES}_SUCCESS`;
export const GET_SHARED_NOTES_FAILED = `${BASE_NAME_SHARED_NOTES}_FAILED`;
export const GET_SHARED_NOTES_DESTROY = `${BASE_NAME_SHARED_NOTES}_DESTROY`;

const BASE_NAME_DETAIL_NOTE = 'GET_DETAIL_NOTE';
export const GET_DETAIL_NOTE_REQUEST = `${BASE_NAME_DETAIL_NOTE}_REQUEST`;
export const GET_DETAIL_NOTE_SUCCESS = `${BASE_NAME_DETAIL_NOTE}_SUCCESS`;
export const GET_DETAIL_NOTE_FAILED = `${BASE_NAME_DETAIL_NOTE}_FAILED`;
export const GET_DETAIL_NOTE_DESTROY = `${BASE_NAME_DETAIL_NOTE}_DESTROY`;

interface getAllNotesRequestAction {
  type: typeof GET_ALL_NOTES_REQUEST;
}
interface getAllNotesSuccessAction {
  type: typeof GET_ALL_NOTES_SUCCESS;
  payload: {data: any};
}
interface getAllNotesFailedAction {
  type: typeof GET_ALL_NOTES_FAILED;
  payload: any;
}
interface getAllNotesDestroyAction {
  type: typeof GET_ALL_NOTES_DESTROY;
}

interface getSharedNotesRequestAction {
  type: typeof GET_SHARED_NOTES_REQUEST;
}
interface getSharedNotesSuccessAction {
  type: typeof GET_SHARED_NOTES_SUCCESS;
  payload: {data: any};
}
interface getSharedNotesFailedAction {
  type: typeof GET_SHARED_NOTES_FAILED;
  payload: any;
}
interface getSharedNotesDestroyAction {
  type: typeof GET_SHARED_NOTES_DESTROY;
}

interface getDetailNoteRequestAction {
  type: typeof GET_DETAIL_NOTE_REQUEST;
}
interface getDetailNoteSuccessAction {
  type: typeof GET_DETAIL_NOTE_SUCCESS;
  payload: {data: any};
}
interface getDetailNoteFailedAction {
  type: typeof GET_DETAIL_NOTE_FAILED;
  payload: any;
}
interface getDetailNoteDestroyAction {
  type: typeof GET_DETAIL_NOTE_DESTROY;
}

export type GET_ALL_NOTES_ACTION_TYPES =
  | getAllNotesRequestAction
  | getAllNotesSuccessAction
  | getAllNotesFailedAction
  | getAllNotesDestroyAction;

export type GET_SHARED_NOTES_ACTION_TYPES =
  | getSharedNotesRequestAction
  | getSharedNotesSuccessAction
  | getSharedNotesFailedAction
  | getSharedNotesDestroyAction;

export type GET_DETAIL_NOTE_ACTION_TYPES =
  | getDetailNoteRequestAction
  | getDetailNoteSuccessAction
  | getDetailNoteFailedAction
  | getDetailNoteDestroyAction;

interface ChapterMaterial {
  id?: number;
  chapter_id?: number;
  learning_method?: {
    id?: number;
    name?: string;
  };
  title?: string;
  description?: string;
  orders?: number;
  file_id?: string;
  is_active?: boolean;
  service?: string;
  path_url?: string;
}

export interface IGetNotesParam extends IBasePaginationFilter {
  chapter_id: any;
}

export interface IGetDetailNoteParam {
  note_id: any;
}

interface IUserNotesResponse {
  id: number;
  user_type_id: number;
  full_name: string;
  user_type: {
    id: number;
    name: string;
    icon_mobile: string;
    description: string;
    display: boolean;
  };
}
export interface IGetNotesResponseData {
  id?: number | any;
  user_id?: number;
  notes?: string;
  chapter_material_id?: number;
  file?: string;
  created_at?: string;
  path_url?: string;
  full_name?: string;
  role?: string;
  chapter_material?: ChapterMaterial;
  user?: IUserNotesResponse;
}

export interface INotesInitialState {
  loadingList: boolean;
  allNotes: IGetNotesResponse | null;
  allNotesNextPage: boolean;
  sharedNotesNextPage: boolean;
  sharedNotes: IGetNotesResponse | null;
  detailNote: IGetDetailNoteResponse | null;
  error: null;
}

export type IGetNotesResponse = IBaseResponseData<IGetNotesResponseData[]>;

export type IGetDetailNoteResponse = IBaseResponseData<IGetNotesResponseData>;
