const BASE_NAME = 'TAGS';
export const TAGS_REQUEST = `${BASE_NAME}_REQUEST`;
export const TAGS_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const TAGS_FAILED = `${BASE_NAME}_FAILED`;
export const TAGS_DESTROY = `${BASE_NAME}_DESTROY`;

interface TagsRequestAction {
  type: typeof TAGS_REQUEST;
}

interface TagsSuccessAction {
  type: typeof TAGS_SUCCESS;
  payload: {data: any};
}

interface TagsFailedAction {
  type: typeof TAGS_FAILED;
  payload: any;
}

interface TagsDestroyAction {
  type: typeof TAGS_DESTROY;
}

export type TAGS_ACTION_TYPES =
  | TagsRequestAction
  | TagsSuccessAction
  | TagsFailedAction
  | TagsDestroyAction;
