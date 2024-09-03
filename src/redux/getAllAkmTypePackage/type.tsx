const BASE_NAME = 'GET_ALL_AKM_TYPE_PACKAGE';
export const GET_ALL_AKM_TYPE_PACKAGE_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_ALL_AKM_TYPE_PACKAGE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_ALL_AKM_TYPE_PACKAGE_FAILED = `${BASE_NAME}_FAILED`;
export const GET_ALL_AKM_TYPE_PACKAGE_DESTROY = `${BASE_NAME}_DESTROY`;

interface getAllAkmChapterRequestAction {
  type: typeof GET_ALL_AKM_TYPE_PACKAGE_REQUEST;
}

interface getAllAkmChapterSuccessAction {
  type: typeof GET_ALL_AKM_TYPE_PACKAGE_SUCCESS;
  payload: {data: any};
}

interface getAllAkmChapterFailedAction {
  type: typeof GET_ALL_AKM_TYPE_PACKAGE_FAILED;
  payload: any;
}

interface getAllAkmChapterDestroyAction {
  type: typeof GET_ALL_AKM_TYPE_PACKAGE_DESTROY;
}

export type GET_ALL_AKM_TYPE_PACKAGE_ACTION_TYPES =
  | getAllAkmChapterRequestAction
  | getAllAkmChapterSuccessAction
  | getAllAkmChapterFailedAction
  | getAllAkmChapterDestroyAction;
