import {useNotificationStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useNotificationStore(
//     (state: INotification) => state.errorMessage,
//   );
// };
export const useNotificationData = () => {
  return useNotificationStore((state: INotification) => state.notificationData);
};

export const useNotificationState = () => {
  return useNotificationStore(
    (state: INotification) => state.notificationState,
  );
};

export const useIsShowNotification = () => {
  return useNotificationStore(
    (state: INotification) => state.isShowNotification,
  );
};

// 🎉 one selector for all our actions
export const useNotificationActions = () =>
  useNotificationStore((state: INotification) => state.actions);
