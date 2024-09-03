import {AKM_REQUEST, AKM_SUCCESS, AKM_FAILED, AKM_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const AKMReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case AKM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AKM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case AKM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case AKM_DESTROY:
      return state;
    default:
      return state;
  }
};

export default AKMReducer;
