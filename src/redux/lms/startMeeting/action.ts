import {Dispatch} from 'redux';
import {
  START_MEETING_REQUEST,
  START_MEETING_SUCCESS,
  START_MEETING_FAILED,
  START_MEETING_DESTROY,
  START_MEETING_ACTION_TYPES,
  IStartMeetingResponse,
  IStartMeetingBody,
} from './type';
import {AxiosResponse} from 'axios';
import provider from '@services/lms/provider';

const startMeetingRequest = () => {
  return {
    type: START_MEETING_REQUEST,
  };
};
const startMeetingSuccess = (data: IStartMeetingResponse) => {
  return {
    type: START_MEETING_SUCCESS,
    payload: data,
  };
};
const startMeetingFailed = (error: any) => {
  return {
    type: START_MEETING_FAILED,
    payload: error,
  };
};
export const startMeetingDestroy = () => {
  return {
    type: START_MEETING_DESTROY,
  };
};

export const fetchStartMeeting = (
  body: IStartMeetingBody,
  callback?: () => void,
): any => {
  return async (
    dispatch: Dispatch<START_MEETING_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(startMeetingRequest());
    try {
      const res: AxiosResponse<IStartMeetingResponse> =
        await provider.startMeeting(body);

      dispatch(startMeetingSuccess(res.data));
      callback?.();
    } catch (err) {
      dispatch(startMeetingFailed(err));
    }
  };
};
