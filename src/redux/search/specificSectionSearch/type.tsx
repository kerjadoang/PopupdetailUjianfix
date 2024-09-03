const BASE_NAME = 'SPECIFIC_SEARCH';
const BASE_NAME_ALL = 'SPECIFIC_SEARCH_ALL';

export const SPECIFIC_SEARCH_REQUEST = `${BASE_NAME}_REQUEST`;
export const SPECIFIC_SEARCH_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const SPECIFIC_SEARCH_FAILED = `${BASE_NAME}_FAILED`;
export const SPECIFIC_SEARCH_DESTROY = `${BASE_NAME}_DESTROY`;

export const SPECIFIC_SEARCH_ALL_REQUEST = `${BASE_NAME_ALL}_ALL_REQUEST`;
export const SPECIFIC_SEARCH_ALL_SUCCESS = `${BASE_NAME_ALL}_ALL_SUCCESS`;
export const SPECIFIC_SEARCH_ALL_FAILED = `${BASE_NAME_ALL}_ALL_FAILED`;
export const SPECIFIC_SEARCH_ALL_DESTROY = `${BASE_NAME_ALL}_ALL_DESTROY`;

interface SpecificSearchRequestAction {
  type: typeof SPECIFIC_SEARCH_REQUEST;
}
interface SpecificSearchSuccessAction {
  type: typeof SPECIFIC_SEARCH_SUCCESS;
  payload: {data: any};
}
interface SpecificSearchFailedAction {
  type: typeof SPECIFIC_SEARCH_FAILED;
  payload: any;
}
interface SpecificSearchDestroyAction {
  type: typeof SPECIFIC_SEARCH_DESTROY;
}

interface SpecificSearchAllRequestAction {
  type: typeof SPECIFIC_SEARCH_ALL_REQUEST;
}
interface SpecificSearchAllSuccessAction {
  type: typeof SPECIFIC_SEARCH_ALL_SUCCESS;
  payload: {data: any};
}
interface SpecificSearchAllFailedAction {
  type: typeof SPECIFIC_SEARCH_ALL_FAILED;
  payload: any;
}
interface SpecificSearchAllDestroyAction {
  type: typeof SPECIFIC_SEARCH_ALL_DESTROY;
}

export type SPECIFIC_SEARCH_ACTION_TYPES =
  | SpecificSearchRequestAction
  | SpecificSearchSuccessAction
  | SpecificSearchFailedAction
  | SpecificSearchDestroyAction;
export type SPECIFIC_SEARCH_ALL_ACTION_TYPES =
  | SpecificSearchAllRequestAction
  | SpecificSearchAllSuccessAction
  | SpecificSearchAllFailedAction
  | SpecificSearchAllDestroyAction;

export interface ISpecificSearchResponseData {
  id?: number;
  subject?: IBaseIdAndName;
  chapter?: IBaseIdAndName;
  name?: string;
  file?: string;
  thumbnail?: string;
  service_method?: {
    id: number;
    name: string;
    group: string;
  };
  type?: string;
  school_id?: number;
  total?: 0;
}

export type ISpecificSearchResponse = IBaseResponseData<
  ISpecificSearchResponseData[]
>;

export type ISpecificSearchQuery = {
  words: string;
  page: number;
  size: number;
  global_type?: string;
} & IBasePaginationFilter;

type ISpecificSearchData = {
  materi: ISpecificSearchResponseData[];
  lainnya: ISpecificSearchResponseData[];
  soal: ISpecificSearchResponseData[];
  video: ISpecificSearchResponseData[];
};
export type ISpecificSearchState = {
  loading: boolean;
  data: ISpecificSearchData;
  allData: ISpecificSearchData;
  error: any;
};
