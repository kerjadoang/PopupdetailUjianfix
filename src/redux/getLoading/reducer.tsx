import {LOADING_SHOW, LOADING_DISMISS, LOADING_ACTION_TYPES} from './type';

const initialState = {
  count: 0,
  data: false,
  fetched: false,
};

const getLoadingReducer = (
  state = initialState,
  action: LOADING_ACTION_TYPES,
) => {
  switch (action?.type) {
    case LOADING_SHOW:
      if (state.count === 0) {
        return {
          ...state,
          count: state.count + 1,
          data: true,
        };
      }
      return {
        ...state,
        count: state.count + 1,
      };
    case LOADING_DISMISS:
      const currentCount = state.count - 1;
      if (currentCount <= 0 || action?.payload?.forceDismiss) {
        return {
          ...state,
          count: 0,
          data: false,
        };
      }
      return {
        ...state,
        count: currentCount,
      };
    default:
      return state;
  }
};

export default getLoadingReducer;
