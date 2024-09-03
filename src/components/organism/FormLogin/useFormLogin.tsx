import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLogin,
  fetchChangePasswordOTP,
  changePasswordOTPDestroy,
  fetchImage,
  loginDestroy,
  authenticationDestroy,
  getUserStoreToken,
} from '@redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import jwtDecode from 'jwt-decode';
import {
  EncryptMD5,
  checkPushNotifPermission,
  convertDate,
  dismissLoading,
  showErrorToast,
  showLoading,
  sleep,
} from '@constants/functional';
import messaging from '@react-native-firebase/messaging';
import {Linking, Platform} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import dayjs from 'dayjs';
import {Storage} from '@constants/storage';
import {usePrefetchUserData} from '@services/uaa';
interface RootState {
  login: any;
  changePasswordOTP: any;
  image: any;
}
const Service = () => {
  const route = useRoute();
  const {phone_number, avatar, username}: any = route?.params;
  const navigation: any = useNavigation();
  const [valid, setValid] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [popUp, setPopUp] = useState(false);
  const [popUpSSO, setPopUpSSO] = useState(false);

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      username: username,
    }));
  }, [username]);
  const login = useSelector((state: RootState) => state?.login);
  const changePasswordOTP = useSelector(
    (state: RootState) => state?.changePasswordOTP,
  );
  const {fetchUserData} = usePrefetchUserData();
  const dispatch = useDispatch();
  useEffect(() => {
    setValid(false);
    const fetchData = async () => {
      try {
        await dispatch(fetchImage(avatar));
      } catch (error) {
        // console.error(error);
      }
    };

    fetchData();
  }, [dispatch, avatar]);
  useEffect(() => {
    return () => {
      dispatch(authenticationDestroy());
      dispatch(changePasswordOTPDestroy());
    };
  }, []);
  const image = useSelector((state: RootState) => state?.image);
  useEffect(() => {
    if (login?.loading) {
      setLoading(true);
      return;
    }

    if (login?.error === '') {
      proses();
      setLoading(false);
      return;
    }

    if (login?.error) {
      switch (login?.error?.code) {
        case 112:
          setPopUpSSO(true);
          setValid(true);
          dispatch(loginDestroy());
          break;
        case 302:
          setMessage('Kata sandi Wajib diisi');
          setValid(true);
          dispatch(loginDestroy());
          break;
        case 401:
          setMessage(
            'Kesempatan percobaan untuk masuk sudah habis. Coba masuk kembali setelah 1 jam.',
          );
          setValid(true);
          setIsDisable(true);
          dispatch(loginDestroy());
          break;
        case 402:
          if (login?.error?.data?.max_password_failed >= 6) {
            setMessage(
              `Kata sandi salah. Tersisa ${login?.error?.data?.max_password_failed} percobaan untuk masuk ke akun.`,
            );
          } else if (login?.error?.data?.max_password_failed >= 3) {
            setMessage(
              `Kata sandi salah. Tersisa ${login?.error?.data?.max_password_failed} percobaan untuk masuk ke akun. jika percobaan habis, silakan coba kembali setelah 1 jam.`,
            );
            setAlert(true);
          } else {
            setMessage(
              'Kesempatan percobaan untuk masuk sudah habis. Coba masuk kembali setelah 1 jam.',
            );
            setAlert(true);
          }
          setValid(true);
          dispatch(loginDestroy());
          break;
        default:
          showErrorToast(login?.error?.message, {visibilityTime: 2000});
          dispatch(loginDestroy());
          break;
      }
    }
  }, [dispatch, login?.error, login?.loading]);

  useEffect(() => {
    if (
      (changePasswordOTP?.data?.code === 100 && pressed) ||
      changePasswordOTP?.error?.code === 407
    ) {
      navigation.navigate('VerificationScreen', {
        screenName: 'forgotPass',
        userName: username,
        phoneNumber: phone_number,
      });
      setPressed(false);
      setMessage('');
      dispatch(changePasswordOTPDestroy());
      return;
    } else if (changePasswordOTP?.error?.code === 415) {
      navigation.navigate('ForgotPasswordScreen', {
        screenName: 'forgotPass',
        userName: username,
        phoneNumber: phone_number,
      });
      setPressed(false);
      setMessage('');
      dispatch(changePasswordOTPDestroy());
      return;
    } else if (changePasswordOTP?.error?.code === 427) {
      setPopUp(true);
      return;
    } else {
      return;
    }
  }, [changePasswordOTP]);

  const handleuserChange = (e: string) => {
    setForm({
      ...form,
      password: e,
    });
  };

  const submitForgot = () => {
    dispatch(
      fetchChangePasswordOTP(phone_number || form?.username, undefined, () => {
        // const errMessage =
        //   err?.message || err?.data?.message || 'Terjadi Kesalahan';
        // showErrorToast(errMessage);
      }),
    );
    setPressed(true);
  };

  const submit = async () => {
    let fcmToken = 'kelas-pintar-fcm-token';
    try {
      const getNotificationPermission = await checkPushNotifPermission();
      switch (getNotificationPermission) {
        case 'granted':
          fcmToken = await messaging().getToken();
          break;

        default:
          break;
      }
    } catch (e) {}

    const requestBody = {
      fcm_token: fcmToken,
      username: form.username,
      platform: Platform.OS,
      password: form.password ? EncryptMD5(form.password) : '',
      region: dayjs.tz.guess(),
    };

    dispatch(fetchLogin(requestBody));
  };

  const checkLoginMode = () => {
    const indexOfColon = form.username.indexOf(':');
    const isAdmin = indexOfColon !== -1;
    Storage.saveToStorage({
      key: 'isAdmin',
      data: isAdmin,
      ttl: convertDate().set('year', 2),
    });
    return;
  };

  const proses = async () => {
    try {
      const {access_token} = login?.data?.data || {};
      if (!access_token) {
        throw new Error('Access token not found');
      }
      showLoading();
      const token = JSON.stringify(access_token);
      await storeData(Keys.token, token);
      fetchUserData();
      await sleep(150); //hold until fetchUserData almost done
      const decode: any = jwtDecode(access_token);
      const {data} = login?.data;
      const isDummy = JSON.stringify(data);
      storeData(Keys.dataUser, isDummy);
      checkLoginMode();
      dispatch(authenticationDestroy());
      dispatch(loginDestroy());
      setForm(prevForm => ({
        ...prevForm,
        password: '',
      }));
      dispatch(getUserStoreToken(access_token));
      switch (decode.user_type_id) {
        case 1:
          // await navigation.replace('BottomTabNavigator');
          await navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigator'}],
          });
          break;
        case 2:
          // await navigation.replace('BottomTabNavigatorParent');
          await navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigatorParent'}],
          });
          break;
        case 3:
          // await navigation.replace('BottomTabNavigatorMentor');
          await navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigatorMentor'}],
          });
          break;
        case 4:
          // await navigation.replace('BottomTabNavigatorKepsek');
          await navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigatorKepsek'}],
          });
          break;
        case 5:
          // await navigation.replace('BottomTabNavigatorGuru');
          await navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigatorGuru'}],
          });
          break;
        case 6:
          // await navigation.replace('BottomTabNavigatorAdmin');
          await navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigatorAdmin'}],
          });
          break;
        case 7:
          // await navigation.replace('BottomTabNavigatorAdmin');
          await navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigatorAdmin'}],
          });
          break;
        default:
          throw new Error('Invalid user type');
      }
      dismissLoading();
    } catch (error) {
      // console.error(error);
    }
  };

  const storeData = async (key: any, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  const openWhatsApp = () => {
    const url =
      'https://api.whatsapp.com/send/?phone=6281513003999&text=Hi+Kelas+Pintar%21+Saya+butuh+penjelasan+mengenai...&type=phone_number&app_absent=0';

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Tidak ada whatsapp',
          });
        }
      })
      .catch(() => {
        // return console.log('Error:', error);
      });
  };
  return {
    valid,
    form,
    handleuserChange,
    setValid,
    submit,
    loading,
    submitForgot,
    message,
    alert,
    isDisable,
    image,
    popUp,
    setPopUp,
    openWhatsApp,
    popUpSSO,
    setPopUpSSO,
  };
};

export default Service;
