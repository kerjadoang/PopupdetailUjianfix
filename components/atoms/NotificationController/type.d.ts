import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {NavigationProp} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {NotificationActivityData} from 'src/components/pages/NotificationScreen/type';

interface INotificationData {
  id?: string;
  title?: string;
  email?: string;
  full_name?: string;
  id_user?: string;
  mat_code?: string;
  promo_code?: string;
  user_token?: string;
  channel_id?: string;
  channel_name?: string;
  type?: NotificationType;
  url?: string;
  notification?: FirebaseMessagingTypes.Notification;
  notification_state?: INotificationState;
  is_webview?: string; //'true' / 'false'
  campaign_id?: string;
}

interface ICampaignTracker {
  campaign_id?: string;
  user_id?: number;
  user_token?: string;
  platform?: string;
}

type NotificationType =
  | 'pancasila-recommendation'
  | 'trial'
  | 'promo'
  | 'engagement'
  | 'virtual-meeting'
  | 'exam-schedule'
  | 'lkpd'
  | 'exam-schedule'
  | 'tugas';

type INotifData = {
  time_start?: string;
  time_end?: string;
} & INotificationData &
  Partial<NotificationActivityData>;

type INavigateNotification = {
  notifData: INotifData;
  navigation: NavigationProp<ParamList>;
};
