const BASE_NAME = 'XP';
export const XP_REQUEST = `${BASE_NAME}_REQUEST`;
export const XP_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const XP_FAILED = `${BASE_NAME}_FAILED`;
export const XP_DESTROY = `${BASE_NAME}_DESTROY`;

interface XpRequestAction {
  type: typeof XP_REQUEST;
}

interface XpSuccessAction {
  type: typeof XP_SUCCESS;
  payload: {data: any};
}

interface XpFailedAction {
  type: typeof XP_FAILED;
  payload: any;
}

interface XpDestroyAction {
  type: typeof XP_DESTROY;
}

export type XP_ACTION_TYPES =
  | XpRequestAction
  | XpSuccessAction
  | XpFailedAction
  | XpDestroyAction;
