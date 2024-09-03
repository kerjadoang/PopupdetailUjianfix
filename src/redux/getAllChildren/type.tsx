const BASE_NAME = 'GET_ALL_CHILDREN';
export const GET_ALL_CHILDREN_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_CHILDREN_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_CHILDREN_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_CHILDREN_DESTROY = `${BASE_NAME}_DESTROY`;

interface GetAllChildrenRequestAction {
  type: typeof GET_ALL_CHILDREN_REQUEST;
}

interface GetAllChildrenSuccessAction {
  type: typeof GET_ALL_CHILDREN_SUCCESS;
  payload: {data: any};
}

interface GetAllChildrenFailedAction {
  type: typeof GET_ALL_CHILDREN_FAILED;
  payload: any;
}

interface GetAllChildrenDestroyAction {
  type: typeof GET_ALL_CHILDREN_DESTROY;
}

export type GET_ALL_CHILDREN_ACTION_TYPES =
  | GetAllChildrenRequestAction
  | GetAllChildrenSuccessAction
  | GetAllChildrenFailedAction
  | GetAllChildrenDestroyAction;
