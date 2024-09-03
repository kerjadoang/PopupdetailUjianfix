import {URL_PATH} from '@constants/url';

const provider = {
  getListStatusProyek: () => URL_PATH.pancasila_get_list_status_proyek(),
  getListNotes: () => URL_PATH.get_pancasila_list_notes(),
  deleteNotes: (idNotes?: number) =>
    URL_PATH.delete_pancasila_list_notes(idNotes),
  editNotes: (idNotes?: number) => URL_PATH.put_pancasila_notes(idNotes),
};

export default provider;
