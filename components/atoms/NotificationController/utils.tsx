import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {
  ICampaignTracker,
  INavigateNotification,
  INotificationData,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {
  _handleUserTypeId,
  convertDate,
  getTimezoneOffset,
  isText,
  jwtDecode,
  showErrorToast,
} from '@constants/functional';
import notifee, {
  AndroidBigPictureStyle,
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
  Notification,
} from '@notifee/react-native';
import {Platform} from 'react-native';
import {apiGet, apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {getToken} from '@hooks/getToken';

export const notificationWhiteListRoute = [
  'Beranda',
  'Aktivitas',
  'Cart',
  'Profil',
  'Laporan',
  'Presensi',
  'Notifikasi',
  'Cart',
  'LMSHomeScreen',
  'AttendanceScreen',
  'reportScreen',
  'Pembelian',
  'BottomTabNavigator',
  'BottomTabNavigatorParent',
  'BottomTabNavigatorMentor',
  'BottomTabNavigatorKepsek',
  'BottomTabNavigatorGuru',
  'BottomTabNavigatorAdmin',
];
export const notificationBlackListRoute = [
  'Splash',
  'MultipleChoiceQuestionScreen',
  'MultipleQuestionTypeScreen',
  'TryOutQuestionScreen',
];

//return false if notificationId is not same with previous
export const isSameNotificationId = async (notificationId: string) => {
  try {
    if (notificationId == null) {
      return false;
    }

    const lastInitialNotificationId = await AsyncStorage.getItem(
      Keys.lastNotificationId,
    );

    if (lastInitialNotificationId === null) {
      await AsyncStorage.setItem(Keys.lastNotificationId, notificationId);
      return false;
    }

    if (lastInitialNotificationId !== notificationId) {
      await AsyncStorage.setItem(Keys.lastNotificationId, notificationId);
      return false;
    }

    return true;
  } catch (e) {
    // don't mind, this is a problem only if the current RN instance has been reloaded by a CP mandatory update
  }
};

export const displayPushNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage | Notification | any,
) => {
  try {
    const notiffId = remoteMessage.messageId || remoteMessage.notification?.id;
    const isSameNotifId = await isSameNotificationId(notiffId);

    if (!remoteMessage || isSameNotifId) {
      return;
    }
    const notification = remoteMessage?.notification;

    const data =
      remoteMessage.data ||
      (remoteMessage.notification?.data as INotificationData);
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    const imageUrl =
      data?.fcm_options?.image || notification?.android?.imageUrl || '';

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: data?.channel_name || 'default',
      name: data?.channel_name || 'Default Channel',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });

    const imageStyle: AndroidBigPictureStyle = {
      picture: imageUrl,
      type: AndroidStyle.BIGPICTURE,
    };

    // Display a notification
    const resNotifId = await notifee.displayNotification({
      // id: notifId,
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      remote: {
        messageId: remoteMessage?.messageId || '',
        senderId: remoteMessage?.from || '',
        mutableContent: 1,
        contentAvailable: 1,
      },
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        style: imageUrl ? imageStyle : undefined,
      },
      ios: {
        critical: true,
        criticalVolume: 0.4,
        attachments: imageUrl ? [{url: imageUrl}] : [],
      },
      data: {
        ...remoteMessage.data,
      },
    });
    return resNotifId;
  } catch (error) {}
};

export const getFCMToken = async () => {
  try {
    return await messaging().getToken();
  } catch (error) {
    return 'kelas-pintar-fcm-token';
  }
};

export const notificationTracker = async (notifData: INotificationData) => {
  try {
    const body: ICampaignTracker = {
      platform: Platform.OS,
      user_id: Number(notifData.id_user),
      user_token: notifData.user_token,
      campaign_id: notifData.campaign_id,
    };
    await apiPost({
      url: URL_PATH.post_campaign_tracker(),
      body,
    });
  } catch (error) {}
};

export const testDisplayNotif = async () => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
};

export const navigateNotification = async ({
  notifData,
  navigation,
}: INavigateNotification) => {
  const isBefore = convertDate().isBefore(convertDate(notifData.time_start));
  const isAfter = convertDate().isAfter(convertDate(notifData.time_end));
  try {
    const userToken = await getToken();
    const user: IBaseJWTUser = jwtDecode(userToken);
    const accountRole = _handleUserTypeId(user.user_type_id ?? 0);
    switch (notifData.type) {
      case 'pancasila-recommendation':
        const data = await apiGet({
          url: URL_PATH.get_pancasila_detail_proyek(
            notifData.id || notifData.id_relasi,
          ),
        });
        const screenParams = {
          projectData: data,
          screen_type: `${accountRole.name} pancasila`,
        };
        navigation.navigate('EbookScreen', screenParams);
        break;
      case 'virtual-meeting':
        const detailMeeting = await apiGet({
          url: URL_PATH.get_detail_virtual_meeting(
            notifData.id || notifData.id_relasi,
          ),
          tags: 'detailMeeting',
        });
        const virtualMeetingParams = {
          data: detailMeeting,
        };
        navigation.navigate(
          'RapatVirtualTestCamerascreen',
          virtualMeetingParams,
        );
        break;
      case 'lkpd':
        navigation.navigate(
          accountRole.role === 'GURU'
            ? 'LkpdTeacherScreen'
            : 'LkpdStudentScreen',
          {id: notifData.id || notifData.id_relasi},
        );
        // navigation.navigateScreen('LembarKerjaScreen', {
        //   title: notifData.title,
        //   id: Number(notifData.id) || 0,
        //   userRole: accountRole.role || 'MURID',
        // });
        break;
      case 'exam-schedule':
        if (isBefore) {
          showErrorToast('Ujian belum dimulai');
          break;
        }

        if (isAfter) {
          showErrorToast('Ujian telah berakhir');
          break;
        }

        const resUjianData = await apiGet({
          url: URL_PATH.start_lms_ujian(
            notifData.id_relasi!,
            getTimezoneOffset(),
          ),
        });

        return navigation.navigate('LMSUjianTestCameraScreen', {
          data: resUjianData,
        });
      case 'tugas':
        if (isBefore) {
          showErrorToast('Tugas belum dimulai');
          break;
        }

        if (isAfter) {
          showErrorToast('Tugas telah berakhir');
          break;
        }

        return navigation.navigate('LMSPRTugasScreen', {
          data: notifData,
        });

      default:
        break;
    }
  } catch (error: any) {
    showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
  } finally {
  }
};
