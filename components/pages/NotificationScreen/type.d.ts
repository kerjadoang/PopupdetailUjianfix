import {NotificationType} from '@components/atoms/NotificationController/type';

export type _ITabLabel = {
  activity: string;
  promo: string;
};

export type _IUpdateReadActivityConfirm = {
  uuid: string;
  type: 'Approved' | 'Rejected';
  notifData: NotificationActivityData;
};

export type _IItem = {
  itemData: any;
  _handleMarkNotif: any;
  _handleUpdateReadActivityConfirm?: any;
};

// export type NotificationTypes = 'pancasila'
export type NotificationActivityData = {
  _id: any;
  id: any;
  uuid: string;
  type: NotificationType;
  id_relasi: number;
  receiver_id: number;
  title: string;
  description: string;
  is_read: number;
  action_tolak_terima: boolean;
  user_id: number;
  created_at: string;
};
