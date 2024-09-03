const BASE_NAME = 'DETAIL_PACKAGE';
export const DETAIL_PACKAGE_REQUEST = `${BASE_NAME}_REQUEST`;
export const DETAIL_PACKAGE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const DETAIL_PACKAGE_FAILED = `${BASE_NAME}_FAILED`;
export const DETAIL_PACKAGE_DESTROY = `${BASE_NAME}_DESTROY`;

interface DetailPackageRequestAction {
  type: typeof DETAIL_PACKAGE_REQUEST;
}

interface DetailPackageSuccessAction {
  type: typeof DETAIL_PACKAGE_SUCCESS;
  payload: {data: any};
}

interface DetailPackageFailedAction {
  type: typeof DETAIL_PACKAGE_FAILED;
  payload: any;
}

interface DetailPackageDestroyAction {
  type: typeof DETAIL_PACKAGE_DESTROY;
}

export type DETAIL_PACKAGE_ACTION_TYPES =
  | DetailPackageRequestAction
  | DetailPackageSuccessAction
  | DetailPackageFailedAction
  | DetailPackageDestroyAction;
