import {apiPost} from '@api/wrapping';
import {getFCMToken} from '@components/atoms/NotificationController/utils';
import {isStringContains, rdxDispatch} from '@constants/functional';
import {StorageKeys} from '@constants/keys';
import {URL_PATH} from '@constants/url';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getSubjectsByClassDestroy,
  getSubjectsByUserClassDestroy,
  getSubjectsFavoriteDestroy,
  getUserDestroy,
  loginDestroy,
  todayAttendanceDestroy,
  verifyOtpDestroy,
} from '@redux';
import FastImage from 'react-native-fast-image';

export const logoutApi = async () => {
  try {
    const [_, token] = await Promise.all([
      notifee.cancelAllNotifications(),
      getFCMToken(),
    ]);
    await apiPost({
      url: URL_PATH.post_logout(),
      body: {
        fcm_token: token,
      },
    });
  } catch (error: any) {
    // showErrorToast(error);
  }
};

const blackListRemovedKeys = [StorageKeys.onboarded];

export const logout = async () => {
  try {
    const removedKeys: any = [];
    for (const data in StorageKeys) {
      const keys = StorageKeys[data as keyof typeof StorageKeys];
      if (isStringContains(keys, undefined, blackListRemovedKeys)) {
        continue;
      }
      removedKeys.push(keys);
    }
    await logoutApi();
    await Promise.all([
      AsyncStorage.multiRemove(removedKeys),
      FastImage.clearMemoryCache(),
      FastImage.clearDiskCache(),
    ]);
    // await AsyncStorage.clear();
    // await AsyncStorage.multiRemove([
    //   Keys.token,
    //   Keys.objectToken,
    //   Keys.deviceUser,
    //   Keys.dataUser,
    //   Keys.profession,
    //   Keys.majors,
    // ]);
    rdxDispatch(getSubjectsByClassDestroy());
    rdxDispatch(getSubjectsByUserClassDestroy());
    rdxDispatch(getSubjectsFavoriteDestroy());
    rdxDispatch(loginDestroy());
    rdxDispatch(getUserDestroy());
    rdxDispatch(verifyOtpDestroy());
    rdxDispatch(todayAttendanceDestroy());
  } catch (error) {
    // console.log('error during logout ', error);
  }
};
