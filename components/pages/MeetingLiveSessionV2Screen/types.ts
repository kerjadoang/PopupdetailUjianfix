import {
  ICheckRequestCallResponse,
  ISendRequestCallResponse,
} from '@services/guru/type';
import {PressableProps} from 'react-native';
// status call zoom
// 0 = ga di apa2in,
// 1 = approved,
// 2 = rejected,
// 3 = closed,
// 4 = waiting approveal
export type StatusType = {
  id?: any;
  label?: 'pending' | 'approved' | 'rejected' | 'initial' | 'closed' | null;
  title?: string;
  actionLabel?: string;
  onActionLabel?: PressableProps['onPress'];
  call_request?: number;
  data?: ISendRequestCallResponse | ICheckRequestCallResponse;
};

export type CallStatusStateType = {
  selected?: StatusType;
  status?: StatusType[];
};

export type ZoomIframeType = {
  email: string;
  id_session: string;
  meeting_id: string;
  name: string;
  password: string;
  signature: string;
  token: string;
  type: 'murid' | 'guru';
};
