export interface IPopularSearchResponseData {
  id?: number;
  words?: string;
  total_search?: number;
  subject_id?: number;
  subject?: IBaseSubject;
}
export interface ILatestSearchResponseData {
  id?: number;
  user_id?: number;
  word?: string;
}

export type IPopularSearchResponse = IBaseResponseData<
  IPopularSearchResponseData[]
>;
export type ILatestSearchResponse = IBaseResponseData<
  ILatestSearchResponseData[]
>;
