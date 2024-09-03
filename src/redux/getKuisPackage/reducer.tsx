import {
  GET_KUIS_PACKAGES_DESTROY,
  GET_KUIS_PACKAGES_FAILED,
  GET_KUIS_PACKAGES_REQUEST,
  GET_KUIS_PACKAGES_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getKuisPackagesReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_KUIS_PACKAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_KUIS_PACKAGES_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_KUIS_PACKAGES_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_KUIS_PACKAGES_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getKuisPackagesReducer;
