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
const initState = {
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
  isBtnDisabled: false,
};
const useVerification = () => {
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
  const [state, setState] = useMergeState(initState);
  const {
    popupData,
    isShowPopup,
    otp,
    retryCount,
    isCountDownRunning,
    countDownTime,
    isBtnDisabled,
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
    username: phoneNumber || userName,
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
    const isNotOnlyNumber = phoneNumber;
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
    dispatch(changeNumberOTPDestroy());
    dispatch(changeNumberDestroy());
  };

  useEffect(() => {
    return () => {
      dispatch(changeNumberOTPDestroy());
      dispatch(changeNumberDestroy());
      dispatch(resendVerifyOtpDestroy());
      dispatch(forgetOtpDestroy());
      dispatch(verifyOtpDestroy());
    };
  }, []);

  useEffect(() => {
    if (!changeNumber?.error) {
      setState({isBtnDisabled: false});
    }
  }, [changeNumber?.error]);

  useEffect(() => {
    if (
      changeNumber?.error !== null &&
      changeNumber?.error?.data?.unlock_time
    ) {
      const date = new Date();
      const currentTime = Math.round(date.getTime() / 1000);
      const targetTime = Math.round(
        new Date(changeNumber?.error?.data?.unlock_time).getTime() / 1000,
      );
      var diffTime = targetTime - currentTime;
      setState({
        isCountDownRunning: false,
        isBtnDisabled: true,
      });
      if (diffTime >= 1) {
        setTimeout(() => {
          setState({
            isCountDownRunning: true,
            countDownTime: diffTime,
          });
        }, 1000);
      } else {
        dispatch(changeNumberOTPDestroy());
        dispatch(changeNumberDestroy());
        setTimeout(() => {
          setState({
            isCountDownRunning: true,
            countDownTime: 60,
            isBtnDisabled: false,
          });
        }, 1000);
      }
    } else {
      setErrorMessage('');
    }
  }, [changeNumber?.error]);

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
        setErrorMessage(
          changeNumber?.error?.data?.unlock_time
            ? 'User dikunci.'
            : changeNumber?.error?.message,
        );
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
      } else if (forgetOtp?.error?.code === 400) {
        setErrorMessage(forgetOtp?.error?.message);
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
    isBtnDisabled,
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

export default useVerification;
