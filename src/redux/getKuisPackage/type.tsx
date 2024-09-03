const BASE_NAME = 'GET_KUIS_PACKAGES';
export const GET_KUIS_PACKAGES_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_KUIS_PACKAGES_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_KUIS_PACKAGES_FAILED = `${BASE_NAME}_FAILED`;
export const GET_KUIS_PACKAGES_DESTROY = `${BASE_NAME}_DESTROY`;

interface getKuisPackagesRequestAction {
  type: typeof GET_KUIS_PACKAGES_REQUEST;
}

interface getKuisPackagesSuccessAction {
  type: typeof GET_KUIS_PACKAGES_SUCCESS;
  payload: {data: any};
}

interface getKuisPackagesFailedAction {
  type: typeof GET_KUIS_PACKAGES_FAILED;
  payload: any;
}

interface getKuisPackagesDestroyAction {
  type: typeof GET_KUIS_PACKAGES_DESTROY;
}

export type GET_KUIS_PACKAGES_ACTION_TYPES =
  | getKuisPackagesRequestAction
  | getKuisPackagesSuccessAction
  | getKuisPackagesFailedAction
  | getKuisPackagesDestroyAction;
