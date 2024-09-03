import {LOADING_SHOW, LOADING_DISMISS, IDismissLoading} from './type';

export const showLoadingAction = () => {
  return {
    type: LOADING_SHOW,
  };
};
export const dismissLoadingAction = (data?: IDismissLoading) => {
  return {
    type: LOADING_DISMISS,
    payload: data,
  };
};
