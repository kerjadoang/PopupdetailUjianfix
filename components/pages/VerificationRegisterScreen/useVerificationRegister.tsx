import {regexOnlyNumber, useMergeState} from '@constants/functional';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Maskot1 from '@assets/svg/maskot_1.svg';

import {
  fetchResendVerifyOtp,
  fetchVerifyOtp,
  verifyOtpDestroy,
  fetchForgetOtp,
  forgetOtpDestroy,
  changeNumberOTPDestroy,
  resendVerifyOtpDestroy,
  fetchChangeNumber,
  changeNumberDestroy,
} from '@redux';
import {useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

interface RootState {
  verifyOtp: any;
  resendVerifyOtp: any;
  changeNumber: any;
  forgetOtp: any;
}
const useVerificationRegister = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const verifyOtp = useSelector((state: RootState) => state?.verifyOtp);
  const resendVerifyOtp = useSelector(
    (state: RootState) => state?.resendVerifyOtp,
  );
  const changeNumber = useSelector((state: RootState) => state?.changeNumber);
  const forgetOtp = useSelector(
    (state: RootState) => state?.forgetOtp || false,
  );
  const {phoneNumber, screenName, userName}: any = route?.params || false;
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
  const navigation: any = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const requestBodyVerifyOtp = {
    username: phoneNumber,
    otp: otp?.value,
  };
  const requestBodyChange = {
    new_phone_number: `${phoneNumber}`,
    otp: otp?.value,
  };
  const requestBodyForget = {
    username: userName,
    otp: otp?.value,
  };

  const isAllInputValid = otp?.isValid;
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

  useEffect(() => {
    if (screenName === 'ChangeNumberScreen') {
      if (changeNumber?.data?.message === 'Phone number has been changed') {
        navigation.pop(2); //back to 2 previous screen which is profile edit screen
        Toast.show({
          type: 'success',
          text1: 'Perubahan berhasil disimpan.',
        });
        dispatch(changeNumberOTPDestroy());
        dispatch(changeNumberDestroy());
      }
      if (changeNumber?.error !== null && changeNumber?.error?.code) {
        setErrorMessage(changeNumber?.error?.message);
      }
    } else if (screenName === 'forgotPass') {
      if (forgetOtp?.data.length !== 0) {
        dispatch(forgetOtpDestroy());
        navigation.navigate('ForgotPasswordScreen', {
          screenName: 'forgotPass',
          userName: userName,
          phoneNumber: phoneNumber,
        });
      }
      // setState({retryCount: retryCount + 1});
      if (forgetOtp?.error?.code === 405) {
        {
          screenName === 'forgotPass' || screenName === 'ChangeNumberScreen'
            ? setErrorMessage('Kode OTP Salah, Silahkan coba lagi.')
            : setErrorMessage(
                'Kode OTP Salah, Tersisa' +
                  forgetOtp?.error?.data?.max_otp_failed +
                  ' percobaan',
              );
        }
      } else if (forgetOtp?.error?.code === 406) {
        setErrorMessage('Kode OTP Sudah Kaladuarsa');
      }
    } else {
      if (verifyOtp?.error && verifyOtp?.error?.code) {
        dispatch(verifyOtpDestroy());
        setState({retryCount: retryCount + 1});
        if (retryCount >= 2) {
          setState({
            countDownTime: 1800,
          });
        }
        setErrorMessage(
          verifyOtp?.error?.data?.message
            ? verifyOtp?.error?.data?.message
            : verifyOtp?.error?.message || '',
        );
      }

      if (verifyOtp?.data?.access_token) {
        navigation.replace('SuccessRegisterScreen', {
          username: phoneNumber,
          verifyOtpAccessToken: verifyOtp?.data?.access_token,
        });
      }
    }
  }, [
    verifyOtp,
    screenName,
    changeNumber,
    forgetOtp,
    dispatch,
    navigation,
    setState,
    retryCount,
    userName,
    phoneNumber,
  ]);

  useEffect(() => {
    if (resendVerifyOtp?.error?.code) {
      dispatch(resendVerifyOtpDestroy());
      _handlerPopUpError(
        resendVerifyOtp?.error?.message?.data?.message,
        resendVerifyOtp?.error?.message || '',
      );
      return;
    }
  }, [resendVerifyOtp]);

  const _handlerPopUpError = (title: any, description: any) => {
    setState({
      popupData: {
        icon: Maskot1,
        title: title,
        description: description,
        labelCancel: 'Kembali',
        onPressConfirm: () => {
          navigation.navigate('Autentikasi', {});
        },
        onPressCancel: () => {
          dispatch(verifyOtpDestroy());
          setState({isShowPopup: false});
        },
      },
      isShowPopup: true,
    });
  };

  const _handlerSubmitData = async () => {
    switch (screenName) {
      case 'ChangeNumberScreen':
        dispatch(fetchChangeNumber(requestBodyChange));
        break;
      case 'forgotPass':
        dispatch(fetchForgetOtp(requestBodyForget));
        break;
      default:
        dispatch(fetchVerifyOtp(requestBodyVerifyOtp));
        break;
    }
  };

  const onPressIconLeft = () => {
    navigation.goBack();
  };

  return {
    popupData,
    isShowPopup,
    countDownTime,
    isCountDownRunning,
    isAllInputValid,
    _handlerValidateOtp,
    _handlerResendOTP,
    _handlerOnFinishedCountDown,
    _handlerSubmitData,
    screenName,
    errorMessage,
    onPressIconLeft,
  };
};

export default useVerificationRegister;
