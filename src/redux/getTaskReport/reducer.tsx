import {TASK_REQUEST, TASK_SUCCESS, TASK_FAILED, TASK_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const taskReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TASK_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case TASK_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case TASK_DESTROY:
      return state;
    default:
      return state;
  }
};

export default taskReducer;
