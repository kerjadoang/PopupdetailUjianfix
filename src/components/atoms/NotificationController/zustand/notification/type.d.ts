interface NotificationAction {
  setNotificationData: (data: INotificationData) => void;
  setIsShowNotification: (data: boolean) => void;
  setNotificationState: (data: INotificationState) => void;
}

interface NotificationState {
  notificationData: INotificationData;
  isShowNotification: boolean;
  notificationState: INotificationState;
}
type INotificationState = 'foreground' | 'background' | 'quit' | '';
type INotification = BaseZustandAction<NotificationAction> &
  BaseZustandState<NotificationState>;
