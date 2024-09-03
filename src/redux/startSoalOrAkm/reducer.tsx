import {
  START_SOAL_OR_AKM_DESTROY,
  START_SOAL_OR_AKM_FAILED,
  START_SOAL_OR_AKM_REQUEST,
  START_SOAL_OR_AKM_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const startSoalOrAkmReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case START_SOAL_OR_AKM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case START_SOAL_OR_AKM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case START_SOAL_OR_AKM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case START_SOAL_OR_AKM_DESTROY:
      return state;
    default:
      return state;
  }
};

export default startSoalOrAkmReducer;
