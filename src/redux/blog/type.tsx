const BASE_NAME = 'BLOG';
export const BLOG_REQUEST = `${BASE_NAME}_REQUEST`;
export const BLOG_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const BLOG_FAILED = `${BASE_NAME}_FAILED`;
export const BLOG_DESTROY = `${BASE_NAME}_DESTROY`;

interface BlogRequestAction {
  type: typeof BLOG_REQUEST;
}

interface BlogSuccessAction {
  type: typeof BLOG_SUCCESS;
  payload: {data: any};
}

interface BlogFailedAction {
  type: typeof BLOG_FAILED;
  payload: any;
}

interface BlogDestroyAction {
  type: typeof BLOG_DESTROY;
}

export type BLOG_ACTION_TYPES =
  | BlogRequestAction
  | BlogSuccessAction
  | BlogFailedAction
  | BlogDestroyAction;
