const BASE_NAME = 'DETAIL_ABSENT';
export const DETAIL_ABSENT_REQUEST = `${BASE_NAME}_REQUEST`;
export const DETAIL_ABSENT_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const DETAIL_ABSENT_FAILED = `${BASE_NAME}_FAILED`;
export const DETAIL_ABSENT_DESTROY = `${BASE_NAME}_DESTROY`;

interface getDetailAbsentRequestAction {
  type: typeof DETAIL_ABSENT_REQUEST;
}

interface getDetailAbsentSuccessAction {
  type: typeof DETAIL_ABSENT_SUCCESS;
  payload: {data: any};
}

interface getDetailAbsentFailedAction {
  type: typeof DETAIL_ABSENT_FAILED;
  payload: any;
}

interface getDetailAbsentDestroyAction {
  type: typeof DETAIL_ABSENT_DESTROY;
}

export type _IPayloadAbsentDetail = {
  user_id: any;
  approval_status: any;
};

export type DETAIL_ABSENT_ACTION_TYPES =
  | getDetailAbsentRequestAction
  | getDetailAbsentSuccessAction
  | getDetailAbsentFailedAction
  | getDetailAbsentDestroyAction;
