const BASE_NAME = 'GET_MATERIAL_TYPES';
export const GET_MATERIAL_TYPES_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_MATERIAL_TYPES_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_MATERIAL_TYPES_FAILED = `${BASE_NAME}_FAILED`;
export const GET_MATERIAL_TYPES_DESTROY = `${BASE_NAME}_DESTROY`;

interface getMaterialTypesRequestAction {
  type: typeof GET_MATERIAL_TYPES_REQUEST;
}

interface getMaterialTypesSuccessAction {
  type: typeof GET_MATERIAL_TYPES_SUCCESS;
  payload: {data: any};
}

interface getMaterialTypesFailedAction {
  type: typeof GET_MATERIAL_TYPES_FAILED;
  payload: any;
}

interface getMaterialTypesDestroyAction {
  type: typeof GET_MATERIAL_TYPES_DESTROY;
}

export type GET_MATERIAL_TYPES_ACTION_TYPES =
  | getMaterialTypesRequestAction
  | getMaterialTypesSuccessAction
  | getMaterialTypesFailedAction
  | getMaterialTypesDestroyAction;
