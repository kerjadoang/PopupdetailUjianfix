const BASE_NAME = 'KP_REGULAR_SEARCH';

export const KP_REGULAR_SEARCH_REQUEST = `${BASE_NAME}_REQUEST`;
export const KP_REGULAR_SEARCH_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const KP_REGULAR_SEARCH_FAILED = `${BASE_NAME}_FAILED`;
export const KP_REGULAR_SEARCH_DESTROY = `${BASE_NAME}_DESTROY`;

interface KpRegularSearchRequestAction {
  type: typeof KP_REGULAR_SEARCH_REQUEST;
}

interface KpRegularSearchSuccessAction {
  type: typeof KP_REGULAR_SEARCH_SUCCESS;
  payload: {data: any};
}

interface KpRegularSearchFailedAction {
  type: typeof KP_REGULAR_SEARCH_FAILED;
  payload: any;
}

interface KpRegularSearchDestroyAction {
  type: typeof KP_REGULAR_SEARCH_DESTROY;
}

export interface IKpRegularSearchParams {
  words: string;
  subjectId: number | string;
  subjectType: KpRegSubjectType;
}

export type KpRegSubjectType = 'learn' | 'practice' | 'test';

export type KpRegularSearchState = {
  loading: boolean;
  error: any;
  data: {
    total: number;
    learn: [];
    practice: [];
    test: [];
  };
};

export interface IKpRegularSearchData {
  kpRegularSearch: KpRegularSearchState;
}

export type KP_REGULAR_SEARCH_ACTION_TYPES =
  | KpRegularSearchRequestAction
  | KpRegularSearchSuccessAction
  | KpRegularSearchFailedAction
  | KpRegularSearchDestroyAction;
