const BASE_NAME = 'CATALOG';
export const CATALOG_REQUEST = `${BASE_NAME}_REQUEST`;
export const CATALOG_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CATALOG_FAILED = `${BASE_NAME}_FAILED`;
export const CATALOG_DESTROY = `${BASE_NAME}_DESTROY`;

interface CatalogRequestAction {
  type: typeof CATALOG_REQUEST;
}

interface CatalogSuccessAction {
  type: typeof CATALOG_SUCCESS;
  payload: {data: any};
}

interface CatalogFailedAction {
  type: typeof CATALOG_FAILED;
  payload: any;
}

interface CatalogDestroyAction {
  type: typeof CATALOG_DESTROY;
}

export type CATALOG_ACTION_TYPES =
  | CatalogRequestAction
  | CatalogSuccessAction
  | CatalogFailedAction
  | CatalogDestroyAction;
