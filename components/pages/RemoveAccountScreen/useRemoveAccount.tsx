import {regexOnlyNumber, useMergeState} from '@constants/functional';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  fetchResendVerifyOtp,
  getUserDestroy,
  loginDestroy,
  todayAttendanceDestroy,
  verifyOtpDestroy,
} from '@redux';
import provider from '@services/uaa/provider';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const useRemoveAccount = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'RemoveAccountScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'RemoveAccountScreen'>>();

  const {getUser}: any = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const {
    phone_number: phoneNumber,
    username: userName,
    user_type_id: userTypeId,
  } = getUser?.data;

  const [checkedAgreement, setCheckedAgreement] = useState<boolean>(false);
  const [isShowPopUp, setIsShowPopUp] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const _handleGoBack = () => {
    navigation.goBack();
  };

  const _handleGoodByeButton = () => {
    navigation.navigate('Autentikasi');
  };

  const [state, setState] = useMergeState({
    otp: {
      value: '',
      isValid: false,
      errorMessage: '',
    },
    retryCount: 0,
    popupData: false,
    isShowPopup: false,
    isCountDownRunning: true,
    countDownTime: 60,
  });
  const {
    popupData,
    isShowPopup,
    otp,
    retryCount,
    isCountDownRunning,
    countDownTime,
  } = state;

  const _handlerValidateOtp = (text: string) => {
    const isConditionInputTextValid = !regexOnlyNumber.test(text);

    setState({
      otp: {
        value: text,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: isConditionInputTextValid
          ? ''
          : 'Kode OTP salah. Silakan coba lagi.',
      },
    });
  };

  const _handlerResendOTP = () => {
    const {retryCount} = state;
    const isNotOnlyNumber = phoneNumber.replace(regexOnlyNumber, '');
    const requestBodyResendVerifyOtp = {
      username: `+${isNotOnlyNumber}`,
    };

    setState({
      isCountDownRunning: true,
      countDownTime: retryCount > 2 ? 1800 : 60,
      retryCount: retryCount > 2 ? 0 : retryCount + 1,
    });
    dispatch(fetchResendVerifyOtp(requestBodyResendVerifyOtp));
  };

  const _handlerOnFinishedCountDown = () => {
    setState({isCountDownRunning: false});
  };

  const _preDeactivedAccount = async () => {
    try {
      const {status} = await provider.preDeactivedAccount();
      if (status === 200) {
      }
    } catch (_) {}
  };

  const _verifyDeactivedAccount = async () => {
    const body = {otp: otp?.value};
    try {
      const {status} = await provider.verivyDeactivedAccount(body);
      if (status === 200) {
        await AsyncStorage.multiRemove([
          Keys.token,
          Keys.objectToken,
          Keys.deviceUser,
          Keys.dataUser,
        ]);
        dispatch(loginDestroy());
        dispatch(getUserDestroy());
        dispatch(verifyOtpDestroy());
        dispatch(todayAttendanceDestroy());
        navigation.navigate('RemoveAccountGoodByeScreen');
      }
    } catch (_) {
      setErrorMessage('Kode OTP Salah, Silahkan coba lagi.');
    }
  };

  const _handleConfirmButton = async () => {
    _verifyDeactivedAccount();
  };

  const _handleSendOTP = () => {
    setIsShowPopUp(false);
    _preDeactivedAccount().then(() => {
      navigation.navigate('RemoveAccountOTPScreen');
    });
  };

  return {
    navigation,
    route,
    checkedAgreement,
    setCheckedAgreement,
    isShowPopUp,
    setIsShowPopUp,
    popupData,
    isShowPopup,
    otp,
    retryCount,
    isCountDownRunning,
    countDownTime,
    userTypeId,
    phoneNumber,
    errorMessage,
    setErrorMessage,
    userName,

    _handlerOnFinishedCountDown,
    _handlerResendOTP,
    _handlerValidateOtp,
    _handleGoBack,
    _handleConfirmButton,
    _handleGoodByeButton,
    _handleSendOTP,
    _verifyDeactivedAccount,
  };
};

export default useRemoveAccount;
