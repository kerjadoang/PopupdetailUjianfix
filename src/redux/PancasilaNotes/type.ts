const BASE_NAME_ALL_NOTES = 'GET_ALL_NOTES_PANCASILA';
export const GET_ALL_NOTES_PANCASILA_REQUEST = `${BASE_NAME_ALL_NOTES}_REQUEST`;
export const GET_ALL_NOTES_PANCASILA_SUCCESS = `${BASE_NAME_ALL_NOTES}_SUCCESS`;
export const GET_ALL_NOTES_PANCASILA_FAILED = `${BASE_NAME_ALL_NOTES}_FAILED`;
export const GET_ALL_NOTES_PANCASILA_DESTROY = `${BASE_NAME_ALL_NOTES}_DESTROY`;

const BASE_NAME_SHARED_NOTES = 'GET_SHARED_NOTES_PANCASILA_PANCASILA';
export const GET_SHARED_NOTES_PANCASILA_REQUEST = `${BASE_NAME_SHARED_NOTES}_REQUEST`;
export const GET_SHARED_NOTES_PANCASILA_SUCCESS = `${BASE_NAME_SHARED_NOTES}_SUCCESS`;
export const GET_SHARED_NOTES_PANCASILA_FAILED = `${BASE_NAME_SHARED_NOTES}_FAILED`;
export const GET_SHARED_NOTES_PANCASILA_DESTROY = `${BASE_NAME_SHARED_NOTES}_DESTROY`;

const BASE_NAME_DETAIL_NOTE = 'GET_DETAIL_NOTE_PANCASILA';
export const GET_DETAIL_NOTE_PANCASILA_REQUEST = `${BASE_NAME_DETAIL_NOTE}_REQUEST`;
export const GET_DETAIL_NOTE_PANCASILA_SUCCESS = `${BASE_NAME_DETAIL_NOTE}_SUCCESS`;
export const GET_DETAIL_NOTE_PANCASILA_FAILED = `${BASE_NAME_DETAIL_NOTE}_FAILED`;
export const GET_DETAIL_NOTE_PANCASILA_DESTROY = `${BASE_NAME_DETAIL_NOTE}_DESTROY`;

interface getAllNotesPancasilaRequestAction {
  type: typeof GET_ALL_NOTES_PANCASILA_REQUEST;
}
interface getAllNotesPancasilaSuccessAction {
  type: typeof GET_ALL_NOTES_PANCASILA_SUCCESS;
  payload: {data: any};
}
interface getAllNotesPancasilaFailedAction {
  type: typeof GET_ALL_NOTES_PANCASILA_FAILED;
  payload: any;
}
interface getAllNotesPancasilaDestroyAction {
  type: typeof GET_ALL_NOTES_PANCASILA_DESTROY;
}

interface getSharedNotesPancasilaRequestAction {
  type: typeof GET_SHARED_NOTES_PANCASILA_REQUEST;
}
interface getSharedNotesPancasilaSuccessAction {
  type: typeof GET_SHARED_NOTES_PANCASILA_SUCCESS;
  payload: {data: any};
}
interface getSharedNotesPancasilaFailedAction {
  type: typeof GET_SHARED_NOTES_PANCASILA_FAILED;
  payload: any;
}
interface getSharedNotesPancasilaDestroyAction {
  type: typeof GET_SHARED_NOTES_PANCASILA_DESTROY;
}

interface getDetailNotePancasilaRequestAction {
  type: typeof GET_DETAIL_NOTE_PANCASILA_REQUEST;
}
interface getDetailNotePancasilaSuccessAction {
  type: typeof GET_DETAIL_NOTE_PANCASILA_SUCCESS;
  payload: {data: any};
}
interface getDetailNotePancasilaFailedAction {
  type: typeof GET_DETAIL_NOTE_PANCASILA_FAILED;
  payload: any;
}
interface getDetailNotePancasilaDestroyAction {
  type: typeof GET_DETAIL_NOTE_PANCASILA_DESTROY;
}

export type GET_ALL_NOTES_PANCASILA_ACTION_TYPES =
  | getAllNotesPancasilaRequestAction
  | getAllNotesPancasilaSuccessAction
  | getAllNotesPancasilaFailedAction
  | getAllNotesPancasilaDestroyAction;

export type GET_SHARED_NOTES_PANCASILA_ACTION_TYPES =
  | getSharedNotesPancasilaRequestAction
  | getSharedNotesPancasilaSuccessAction
  | getSharedNotesPancasilaFailedAction
  | getSharedNotesPancasilaDestroyAction;

export type GET_DETAIL_NOTE_PANCASILA_ACTION_TYPES =
  | getDetailNotePancasilaRequestAction
  | getDetailNotePancasilaSuccessAction
  | getDetailNotePancasilaFailedAction
  | getDetailNotePancasilaDestroyAction;
