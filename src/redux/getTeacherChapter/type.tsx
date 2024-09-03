const BASE_NAME = 'GET_TEACHER_CHAPTER';
export const GET_TEACHER_CHAPTER_REQUEST = `${BASE_NAME}_REQUEST`;
export const GET_TEACHER_CHAPTER_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const GET_TEACHER_CHAPTER_FAILED = `${BASE_NAME}_FAILED`;
export const GET_TEACHER_CHAPTER_DESTROY = `${BASE_NAME}_DESTROY`;

interface getTeacherChapterRequestAction {
  type: typeof GET_TEACHER_CHAPTER_REQUEST;
}

interface getTeacherChapterSuccessAction {
  type: typeof GET_TEACHER_CHAPTER_SUCCESS;
  payload: {data: any};
}

interface getTeacherChapterFailedAction {
  type: typeof GET_TEACHER_CHAPTER_FAILED;
  payload: any;
}

interface getTeacherChapterDestroyAction {
  type: typeof GET_TEACHER_CHAPTER_DESTROY;
}

export type GET_TEACHER_CHAPTER_ACTION_TYPES =
  | getTeacherChapterRequestAction
  | getTeacherChapterSuccessAction
  | getTeacherChapterFailedAction
  | getTeacherChapterDestroyAction;
