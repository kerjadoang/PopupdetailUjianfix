import {create} from 'zustand';
import {INotificationData} from '../../type';

const initialState: BaseZustandState<NotificationState> = {
  notificationData: null,
  isShowNotification: false,
  notificationState: '',
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useNotificationStore = create<INotification>()(set => ({
  ...initialState,
  // ⬇️ separate "namespace" for actions
  actions: {
    setNotificationState: (notificationState: INotificationState) =>
      set({notificationState}),
    setIsShowNotification: isShowNotification => set({isShowNotification}),
    setNotificationData: (notificationData: INotificationData) =>
      set({notificationData}),
    resetState: () => set(initialState),
  },
}));
