const BASE_NAME = 'POST_PAPER_SIZE';
export const POST_PAPER_SIZE_REQUEST = `${BASE_NAME}_REQUEST`;
export const POST_PAPER_SIZE_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const POST_PAPER_SIZE_FAILED = `${BASE_NAME}_FAILED`;
export const POST_PAPER_SIZE_DESTROY = `${BASE_NAME}_DESTROY`;

interface storePaperSizeRequestAction {
  type: typeof POST_PAPER_SIZE_REQUEST;
}

interface storePaperSizeSuccessAction {
  type: typeof POST_PAPER_SIZE_SUCCESS;
  payload: {data: any};
}

interface storePaperSizeFailedAction {
  type: typeof POST_PAPER_SIZE_FAILED;
  payload: any;
}

interface storePaperSizeDestroyAction {
  type: typeof POST_PAPER_SIZE_DESTROY;
}

export type _IPayloadPaperSize = {
  id: number;
  paper_size: string;
  official_paper: any;
};

export type POST_PAPER_SIZE_ACTION_TYPES =
  | storePaperSizeRequestAction
  | storePaperSizeSuccessAction
  | storePaperSizeFailedAction
  | storePaperSizeDestroyAction;
