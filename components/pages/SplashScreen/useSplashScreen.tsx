import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {getToken} from '@hooks/getToken';
import jwtDecode from 'jwt-decode';
import {useDispatch} from 'react-redux';
import {fetchAllCoachmark} from '@redux';
import {
  GenerateUUID,
  appVersion,
  isText,
  showErrorToast,
} from '@constants/functional';
import {apiPost, apiPut} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {getFCMToken} from '@components/atoms/NotificationController/utils';
import {Linking, Platform} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {usePrefetchUserData} from '@services/uaa';

const useSplashScreen = (navigation: any) => {
  const dispatch = useDispatch();
  const [showPopupUpdate, setShowPopupUpdate] = useState<boolean>(false);
  const {fetchUserData} = usePrefetchUserData();

  const fetchUserRole = useCallback(async () => {
    const userToken = await getToken();

    if (userToken === null) {
      await navigation.reset({index: 0, routes: [{name: 'Autentikasi'}]});
      return;
    }

    const user: IBaseJWTUser = jwtDecode(userToken);

    updateFCMToken(userToken);
    fetchUserData();

    if (user.user_type_id === 1) {
      await navigation.replace('BottomTabNavigator');
      return;
    }
    if (user.user_type_id === 2) {
      await navigation.replace('BottomTabNavigatorParent');
      return;
    }
    if (user.user_type_id === 3) {
      await navigation.replace('BottomTabNavigatorMentor');
      return;
    }
    if (user.user_type_id === 4) {
      await navigation.replace('BottomTabNavigatorKepsek');
      return;
    }
    if (user.user_type_id === 5) {
      await navigation.replace('BottomTabNavigatorGuru');
      return;
    }
    if (user.user_type_id === 6) {
      await navigation.replace('BottomTabNavigatorAdmin');
      return;
    }
    if (user.user_type_id === 7) {
      await navigation.replace('BottomTabNavigatorAdmin');
      return;
    }
  }, [fetchUserData, navigation]);

  const _handlerGetAllCoachmark = useCallback(() => {
    dispatch(fetchAllCoachmark());
  }, [dispatch]);

  const _generateDeviceID = async () => {
    const deviceId = GenerateUUID();
    const storageDeviceId = await AsyncStorage.getItem(Keys.deviceId);
    if (storageDeviceId === '' || !storageDeviceId) {
      await AsyncStorage.setItem(Keys.deviceId, deviceId);
    }
  };

  const handlerNavigateAfterSplash = useCallback(() => {
    const boot = async () => {
      return await AsyncStorage.getItem(Keys.onboarded);
    };

    const timeout = setTimeout(() => {
      boot().then(val => {
        if (val) {
          _generateDeviceID();
          fetchUserRole().then(() => _handlerGetAllCoachmark());
        } else {
          navigation.reset({index: 0, routes: [{name: 'Onboarding'}]});
        }
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [_handlerGetAllCoachmark, fetchUserRole, navigation]);

  const handlerCheckVersion = useCallback(async () => {
    const body = {
      // eslint-disable-next-line radix
      version: parseInt(appVersion.replace(/\./g, '')),
    };
    try {
      const resData = await apiPost({
        url: URL_PATH.check_version,
        body,
        withoutToken: true,
      });

      if (resData?.device_eligibility === false) {
        setShowPopupUpdate(true);
        return;
      }

      handlerNavigateAfterSplash();
    } catch (err) {
      showErrorToast(isText(err) ? err : 'Terjadi Kesalahan.');
    }
  }, [handlerNavigateAfterSplash]);

  useEffect(() => {
    handlerCheckVersion();
  }, [handlerCheckVersion]);

  const updateFCMToken = async (userToken: string) => {
    try {
      const currentFCM = await getFCMToken();

      const body = {
        platform: Platform.OS,
        fcm_token: currentFCM,
      };

      await apiPut({
        url: URL_PATH.put_fcm_token(),
        body,
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      });
    } catch (error) {}
  };

  const handleUpdateVersion = () => {
    if (Platform.OS === 'ios') {
      return Linking.openURL(
        'https://apps.apple.com/id/app/kelas-pintar/id1469195409',
      );
    } else if (Platform.OS === 'android') {
      return Linking.openURL(
        'https://play.google.com/store/apps/details?id=id.extramarks.learningapp',
      );
    }
  };

  return {
    showPopupUpdate,
    setShowPopupUpdate,
    handleUpdateVersion,
  };
};

export {useSplashScreen};
