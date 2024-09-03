import {Dispatch} from 'redux';
import {
  TEACHER_JOIN_MEETING_REQUEST,
  TEACHER_JOIN_MEETING_SUCCESS,
  TEACHER_JOIN_MEETING_FAILED,
  TEACHER_JOIN_MEETING_DESTROY,
  TEACHER_JOIN_MEETING_ACTION_TYPES,
  ITeacherJoinMeetingResponse,
} from './type';
import {AxiosResponse} from 'axios';
import provider from '@services/lms/provider';

const teacherJoinMeetingRequest = () => {
  return {
    type: TEACHER_JOIN_MEETING_REQUEST,
  };
};
const teacherJoinMeetingSuccess = (data: ITeacherJoinMeetingResponse) => {
  return {
    type: TEACHER_JOIN_MEETING_SUCCESS,
    payload: data,
  };
};
const teacherJoinMeetingFailed = (error: any) => {
  return {
    type: TEACHER_JOIN_MEETING_FAILED,
    payload: error,
  };
};
export const teacherJoinMeetingDestroy = () => {
  return {
    type: TEACHER_JOIN_MEETING_DESTROY,
  };
};

export const fetchTeacherJoinMeeting = (
  classSessionId: any,
  callback?: () => void,
): any => {
  return async (
    dispatch: Dispatch<TEACHER_JOIN_MEETING_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(teacherJoinMeetingRequest());
    try {
      const res: AxiosResponse<ITeacherJoinMeetingResponse> =
        await provider.teacherJoinMeeting(classSessionId);

      dispatch(teacherJoinMeetingSuccess(res.data));
      callback?.();
    } catch (err) {
      dispatch(teacherJoinMeetingFailed(err));
    }
  };
};
