import {
  SAVE_ANSWER,
  SAVE_ANSWER_DESTROY,
  GET_ANSWERS,
  SaveAnswerType,
  SaveAnswerState,
} from './type';

const initialState: SaveAnswerState = {
  data: [],
};

const saveAnswerReducer: (
  state: SaveAnswerState | undefined,
  action: any,
) => SaveAnswerState = (state = initialState, action: any) => {
  switch (action?.type) {
    case SAVE_ANSWER:
      //kalo usernya gajawab return current answer state
      if (!action?.payload?.userAnswer) {
        return {
          ...state,
          data: [...state.data],
        };
      }

      // get answer data if user already answered
      let saveAnswer = state?.data?.find(
        (item: SaveAnswerType) =>
          item?.questionId === action?.payload?.questionId,
      );

      // change last answer to current answer
      if (saveAnswer) {
        saveAnswer.userAnswer = action?.payload?.userAnswer;
      }

      return {
        ...state,
        data: [...state.data, saveAnswer || action.payload],
      };

    case GET_ANSWERS:
      return {
        ...state,
        data: state.data,
      };
    case SAVE_ANSWER_DESTROY:
      return {
        data: [],
      };
    default:
      return state;
  }
};

export default saveAnswerReducer;
