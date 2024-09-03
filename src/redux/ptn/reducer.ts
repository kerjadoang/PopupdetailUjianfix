import {SET_USER} from './type';

const initialState = {
  user: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
