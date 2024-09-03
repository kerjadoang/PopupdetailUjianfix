import {
  VIRTUAL_MEETING_STATE_UPDATE_TITLE,
  VIRTUAL_MEETING_STATE_UPDATE_DESCRIPTION,
  VIRTUAL_MEETING_STATE_UPDATE_TIME_START,
  VIRTUAL_MEETING_STATE_UPDATE_TIME_END,
  VIRTUAL_MEETING_STATE_UPDATE_DURATION,
  VIRTUAL_MEETING_STATE_UPDATE_MEETING_URL,
  VIRTUAL_MEETING_STATE_UPDATE_PARTICIPANTS,
  VIRTUAL_MEETING_STATE_UPDATE_DESTROY,
  VIRTUAL_MEETING_STATE_UPDATE_PARTICIPANTS_ALL,
} from './type';

const initialState = {
  title: '',
  description: '',
  time_start: '',
  time_end: '',
  participant: [],
  rawParticipants: [],
  isCheckAll: false,
};

const virtualMeetingStateReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case VIRTUAL_MEETING_STATE_UPDATE_DESTROY:
      return {
        title: '',
        description: '',
        time_start: '',
        time_end: '',
        participant: [],
      };
    case VIRTUAL_MEETING_STATE_UPDATE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case VIRTUAL_MEETING_STATE_UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case VIRTUAL_MEETING_STATE_UPDATE_TIME_START:
      return {
        ...state,
        time_start: action.payload,
      };

    case VIRTUAL_MEETING_STATE_UPDATE_TIME_END:
      return {
        ...state,
        time_end: action.payload,
      };

    case VIRTUAL_MEETING_STATE_UPDATE_DURATION:
      return {
        ...state,
        duration: action.payload,
      };

    case VIRTUAL_MEETING_STATE_UPDATE_MEETING_URL:
      return {
        ...state,
        meeting_url: action.payload,
      };

    case VIRTUAL_MEETING_STATE_UPDATE_PARTICIPANTS:
      const objectExists = state.participant.some(meeting => {
        return JSON.stringify(meeting) === JSON.stringify(action.payload);
      });

      let updatedParticipants = [];

      if (objectExists) {
        // Remove participants with the same value as action.payload
        updatedParticipants = state.participant.filter(meeting => {
          return JSON.stringify(meeting) !== JSON.stringify(action.payload);
        });
      } else {
        // Add action.payload to the participants array
        updatedParticipants = [...state.participant, action.payload];
      }

      return {
        ...state,
        participant: updatedParticipants,
      };
    case VIRTUAL_MEETING_STATE_UPDATE_PARTICIPANTS_ALL:
      if (action.payload.length !== 0) {
        return {
          ...state,
          isCheckAll: true,
          participant: action.payload,
        };
      }

      return {
        ...state,
        isCheckAll: false,
        participant: [],
      };

    default:
      return state;
  }
};

export default virtualMeetingStateReducer;
