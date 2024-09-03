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

export const virtualMeetingStateUpdate = (value: string, type: string) => {
  // console.log('VALUE', value);
  // console.log('TYPE', type);
  if (type === 'title') {
    return {
      type: VIRTUAL_MEETING_STATE_UPDATE_TITLE,
      payload: value,
    };
  }
  if (type === 'destroy') {
    return {
      type: VIRTUAL_MEETING_STATE_UPDATE_DESTROY,
    };
  }
  if (type === 'description') {
    return {
      type: VIRTUAL_MEETING_STATE_UPDATE_DESCRIPTION,
      payload: value,
    };
  }
  if (type === 'time_start') {
    return {
      type: VIRTUAL_MEETING_STATE_UPDATE_TIME_START,
      payload: value,
    };
  }
  if (type === 'time_end') {
    return {
      type: VIRTUAL_MEETING_STATE_UPDATE_TIME_END,
      payload: value,
    };
  }
  if (type === 'duration') {
    return {
      type: VIRTUAL_MEETING_STATE_UPDATE_DURATION,
      payload: value,
    };
  }
  if (type === 'meeting_url') {
    return {
      type: VIRTUAL_MEETING_STATE_UPDATE_MEETING_URL,
      payload: value,
    };
  }
  if (type === 'participant') {
    return {
      type: VIRTUAL_MEETING_STATE_UPDATE_PARTICIPANTS,
      payload: value,
    };
  }
  if (type === 'participant_all') {
    return {
      type: VIRTUAL_MEETING_STATE_UPDATE_PARTICIPANTS_ALL,
      payload: value,
    };
  }
};
