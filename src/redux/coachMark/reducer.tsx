import {
  DataTypeCoachmark,
  GET_ALL_COACHMARK_DESTROY,
  GET_ALL_COACHMARK_FAILED,
  GET_ALL_COACHMARK_REQUEST,
  GET_ALL_COACHMARK_SUCCESS,
  ICoachMarkInitialState,
} from './type';

const initialData: DataTypeCoachmark = {
  coachmark_mobile_dashboard: false,
  coachmark_mobile_leaderboard: false,
  coachmark_mobile_schedule: false,
  coachmark_mobile_chapter: false,
  coachmark_mobile_regular: false,
  coachmark_mobile_tanya: false,
  coachmark_mobile_coin: false,
  coachmark_mobile_order: false,
  coachmark_mobile_parent: false,
  coachmark_mobile_soal: false,
  popup_mobile_tanya: false,
  popup_mobile_ptn: false,
};

const initialState: ICoachMarkInitialState = {
  loading: false,
  data: initialData,
  error: null,
};

const getAllCoachmarkReducer = (
  state: ICoachMarkInitialState = initialState,
  action: any,
): ICoachMarkInitialState => {
  switch (action?.type) {
    case GET_ALL_COACHMARK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_COACHMARK_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case GET_ALL_COACHMARK_FAILED:
      return {
        loading: false,
        data: initialData,
        error: action.payload,
      };
    case GET_ALL_COACHMARK_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getAllCoachmarkReducer;
