import client from '@api/alternate';
import {URL_PATH} from '@constants/url';

const provider = {
  getDetailHistoryTanya: (tanya_id: any) =>
    client.get(URL_PATH.get_detail_history_tanya(tanya_id)),
};

export default provider;
