import {useEffect} from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import notifee, {EventType, Event} from '@notifee/react-native';
import {
  displayPushNotification,
  isSameNotificationId,
  navigateNotification,
  notificationBlackListRoute,
  notificationTracker,
} from './utils';
import {
  dismissLoading,
  isPlatformIOS,
  isStringContains,
  primitiveToBoolean,
  redirectToBrowser,
  showLoading,
} from '@constants/functional';

import {useNavigate} from '@hooks/useNavigate';
import {WebViewScreenParam} from 'type/screen';
import {
  useIsShowNotification,
  useNotificationActions,
  useNotificationData,
  useNotificationState,
} from './zustand';
import {INotificationData} from './type';

export const useNotificationController = () => {
  const isLoading = useSelector((state: RootState) => state.getLoading.data);
  const {navigateScreen, getRouteNames, navigation} = useNavigate();
  const notificationData: INotificationData = useNotificationData();
  const notificationState = useNotificationState();
  const isShowNotification = useIsShowNotification();
  const {
    setNotificationData,
    setIsShowNotification,
    setNotificationState,
    resetState: resetNotificationData,
  } = useNotificationActions();

  const isBlackListRoute = (routeName?: string) => {
    return notificationBlackListRoute.some(item =>
      isStringContains(item, routeName || getRouteNames() || ''),
    );
  };

  const openNotification = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | any,
  ) => {
    try {
      // console.log(
      //   '🚀 ~ file: useNotificationController.tsx:56 ~ openNotification ~ remoteMessage:',
      //   remoteMessage,
      // );
      const isSameNotifId = await isSameNotificationId(
        remoteMessage?.messageId || remoteMessage.notification?.id,
      );

      if (isSameNotifId) {
        return;
      }
      const data: INotificationData =
        remoteMessage?.notification?.data || remoteMessage?.data || null;

      if (!data.type) {
        return;
      }

      if (data.campaign_id) {
        await notificationTracker(data);
        if (!primitiveToBoolean(data.is_webview)) {
          return redirectToBrowser(data?.url ?? 'https://www.kelaspintar.id');
        }
      }

      setNotificationData(data);
      setIsShowNotification(true);
    } catch (error) {}
  };

  const listenerForegroundFCM = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    if (!remoteMessage || isBlackListRoute()) {
      return;
    }

    displayPushNotification(remoteMessage);
  };

  const listenerForegroundNotifee = async ({type, detail}: Event) => {
    try {
      switch (type) {
        case EventType.DELIVERED:
          //some code
          break;
        case EventType.PRESS:
          setNotificationState('foreground');
          openNotification(detail);
          break;
      }
    } catch (error) {}
  };

  const listenerBackgroundFCM = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    // console.log(
    //   '🚀 ~ file: useNotificationController.tsx:116 ~ listenerBackgroundFCM ~ remoteMessage:',
    //   remoteMessage,
    // );
    if (!remoteMessage || isBlackListRoute()) {
      return;
    }

    setNotificationState('background');
    openNotification(remoteMessage);
  };

  const listenerClosedApp = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  ) => {
    // console.log(
    //   '🚀 ~ file: useNotificationController.tsx:122 ~ listenerClosedApp ~ remoteMessage:',
    //   remoteMessage,
    // );
    if (!remoteMessage || isBlackListRoute()) {
      return;
    }

    setNotificationState('quit');
    openNotification(remoteMessage);
  };

  const actionConfirm = () => {
    setNotificationData({});
    setIsShowNotification(false);
  };

  //init notification
  useEffect(() => {
    // listener Firebase when application is closed
    messaging().getInitialNotification().then(listenerClosedApp);

    // listener Firebase when application running in background
    const unSubsOnOpennedApp = messaging().onNotificationOpenedApp(
      listenerBackgroundFCM,
    );
    // listener Firebase when application on running
    const unSubsMessage = messaging().onMessage(listenerForegroundFCM);
    // listener notifee / local notification when application on running
    const notifeeForeground = notifee.onForegroundEvent(
      listenerForegroundNotifee,
    );

    // remove all listener
    return () => {
      unSubsMessage();
      unSubsOnOpennedApp();
      notifeeForeground();
    };
  }, []);

  //useEffect navigate to webview
  useEffect(() => {
    const navigateTimeout = getTimeOutForNavigate(notificationState);

    if (!isShowNotification) {
      return;
    }

    if (isLoading) {
      return;
    }

    if (isBlackListRoute()) {
      return;
    }

    if (!notificationData) {
      return;
    }
    // goto WebviewScreen
    showLoading();
    setTimeout(() => {
      dismissLoading();
      if (!isBlackListRoute(getRouteNames())) {
        //if notification type is campaign
        if (notificationData.campaign_id) {
          return navigateScreen<WebViewScreenParam>('WebViewScreen', {
            title: notificationData.channel_name || '',
            url: notificationData.url || '',
            data: notificationData,
          });
        }

        // return navigateToOtherScreen(notificationData);
        return navigateNotification({
          navigation: navigation,
          notifData: notificationData,
        });
      }
      resetNotificationData();
    }, navigateTimeout);

    return () => {
      resetNotificationData();
    };
  }, [isShowNotification, notificationState]);

  const getTimeOutForNavigate = (notificationState: INotificationState) => {
    if (isPlatformIOS) {
      return 1000;
    }

    if (notificationState === 'quit') {
      return 10000;
    }

    if (notificationState === 'background') {
      return 3000;
    }

    return 500;
  };

  return {
    notificationData,
    actionConfirm,
  };
};
