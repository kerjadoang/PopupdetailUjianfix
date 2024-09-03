const BASE_NAME = 'PACKAGE_DETAIL';
export const PACKAGE_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const PACKAGE_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const PACKAGE_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const PACKAGE_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface PackageDetailRequestAction {
  type: typeof PACKAGE_DETAIL_REQUEST;
}

interface PackageDetailSuccessAction {
  type: typeof PACKAGE_DETAIL_SUCCESS;
  payload: {data: any};
}

interface PackageDetailFailedAction {
  type: typeof PACKAGE_DETAIL_FAILED;
  payload: any;
}

interface PackageDetailDestroyAction {
  type: typeof PACKAGE_DETAIL_DESTROY;
}

export type PACKAGE_DETAIL_ACTION_TYPES =
  | PackageDetailRequestAction
  | PackageDetailSuccessAction
  | PackageDetailFailedAction
  | PackageDetailDestroyAction;
