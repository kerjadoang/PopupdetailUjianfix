import client from '@api/alternate';
import {URL_PATH} from '@constants/url';

const provider = {
  getPopularSearch: (params?: IBasePaginationFilter) =>
    client.get(URL_PATH.get_popular_search, {
      params,
    }),
  getLatestSearch: () => client.get(URL_PATH.latest_search),
  deleteLatestSearchItem: (latestSearchId: any) =>
    client.delete(URL_PATH.delete_latest_search_item(latestSearchId)),
  deleteAllLatestSearch: () => client.delete(URL_PATH.delete_all_latest_search),
};

export default provider;
