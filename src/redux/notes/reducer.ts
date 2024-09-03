import {
  GET_ALL_NOTES_REQUEST,
  GET_ALL_NOTES_SUCCESS,
  GET_ALL_NOTES_FAILED,
  GET_ALL_NOTES_DESTROY,
  INotesInitialState,
  GET_SHARED_NOTES_REQUEST,
  GET_SHARED_NOTES_SUCCESS,
  GET_SHARED_NOTES_FAILED,
  GET_SHARED_NOTES_DESTROY,
  GET_DETAIL_NOTE_REQUEST,
  GET_DETAIL_NOTE_SUCCESS,
  GET_DETAIL_NOTE_FAILED,
  GET_DETAIL_NOTE_DESTROY,
} from './type';

const initialState: INotesInitialState = {
  loadingList: false,
  allNotes: null,
  allNotesNextPage: true,
  sharedNotes: null,
  sharedNotesNextPage: true,
  detailNote: null,
  error: null,
};

const notesReducer = (
  state: INotesInitialState = initialState,
  action: any,
): INotesInitialState => {
  switch (action?.type) {
    case GET_ALL_NOTES_REQUEST:
      return {
        ...state,
        loadingList: true,
      };
    case GET_ALL_NOTES_SUCCESS:
      return {
        ...state,
        loadingList: false,
        allNotes:
          action.payload.params?.page === 0
            ? action.payload.data
            : {
                ...state.allNotes,
                data: [
                  ...(state.allNotes?.data as any),
                  ...action.payload.data.data,
                ],
              },
        allNotesNextPage: action.payload.nextPage,
        error: null,
      };
    case GET_ALL_NOTES_FAILED:
      return {
        ...state,
        loadingList: false,
        allNotes: null,
        error: action.payload,
      };
    case GET_ALL_NOTES_DESTROY:
      return {
        ...state,
        loadingList: false,
        allNotes: null,
      };

    case GET_SHARED_NOTES_REQUEST:
      return {
        ...state,
        loadingList: true,
      };
    case GET_SHARED_NOTES_SUCCESS:
      return {
        ...state,
        loadingList: false,
        sharedNotes:
          action.payload.params?.page === 0
            ? action.payload.data
            : {
                ...state.sharedNotes,
                data: [
                  ...(state.sharedNotes?.data as any),
                  ...action.payload.data.data,
                ],
              },
        sharedNotesNextPage: action.payload.nextPage,
        error: null,
      };
    case GET_SHARED_NOTES_FAILED:
      return {
        ...state,
        loadingList: false,
        sharedNotes: null,
        error: action.payload,
      };
    case GET_SHARED_NOTES_DESTROY:
      return {
        ...state,
        loadingList: false,
        sharedNotes: null,
      };

    case GET_DETAIL_NOTE_REQUEST:
      return {
        ...state,
        loadingList: true,
      };
    case GET_DETAIL_NOTE_SUCCESS:
      return {
        ...state,
        loadingList: false,
        detailNote: action.payload,
        error: null,
      };
    case GET_DETAIL_NOTE_FAILED:
      return {
        ...state,
        loadingList: false,
        detailNote: null,
        error: action.payload,
      };
    case GET_DETAIL_NOTE_DESTROY:
      return {
        ...state,
        loadingList: false,
        detailNote: null,
      };
    default:
      return state;
  }
};

export default notesReducer;
