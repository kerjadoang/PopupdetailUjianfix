import {
  regexContainLowerUpperCase,
  regexContainNumber,
  useMergeState,
} from '@constants/functional';
import {useNavigation} from '@react-navigation/native';
import {changeForgetPasswordDestroy, fetchChangeForgetPassword} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import Maskot1 from '@assets/svg/maskot_1.svg';
import Maskot2 from '@assets/svg/ic_logo_doneforget.svg';
import {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
interface RootState {
  changeForgetPassword: any;
}

const initState = {
  currentPassword: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  newPassword: {
    value: '',
    isValid: false,
    errorMessage: '',
    snkPassword: [],
  },
  rePassword: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  popupData: false,
  isShowPopup: false,
};

const useForgotPassword = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {userName, phoneNumber}: any = route?.params;
  const {changeForgetPassword} = useSelector((state: RootState) => state);

  const [state, setState] = useMergeState(initState);
  const EncryptMD5 = (text: string) => {
    try {
      const CryptoJS = require('crypto-js');
      const cipher = CryptoJS.MD5(text);

      return cipher.toString();
    } catch (error) {
      return false;
    }
  };
  const {currentPassword, newPassword, rePassword, popupData, isShowPopup} =
    state;
  const navigation: any = useNavigation();
  const isAllInputNotValid = !newPassword?.isValid || !rePassword?.isValid;
  const requestBody = {
    username: phoneNumber || userName,
    password: EncryptMD5(newPassword?.value),
  };
  const _handlerValidateCurrentPassword = (text: string) => {
    const inputText = text.trim();
    const isConditionInputTextValid = inputText?.length > 0;

    setState({
      currentPassword: {
        value: isConditionInputTextValid ? inputText : false,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: isConditionInputTextValid
          ? ''
          : 'Kata sandi sekarang salah.',
      },
    });
  };

  const _handlerValidateNewPassword = (text: any) => {
    const inputText = text.trim();
    const isFirstConditionValid = inputText.length >= 8;
    const isSecondConditionValid =
      regexContainLowerUpperCase.test(inputText) &&
      regexContainNumber.test(inputText) &&
      inputText?.length > 0;
    const isConditionInputTextValid =
      isFirstConditionValid && isSecondConditionValid;

    setState({
      newPassword: {
        value: isConditionInputTextValid ? inputText : false,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: '',
        snkPassword: [isFirstConditionValid, isSecondConditionValid],
      },
    });
  };
  const _handlerValidateRePassword = (text: string) => {
    const inputText = text.trim();
    const isConditionInputTextValid =
      newPassword?.value === inputText || inputText === newPassword?.value;

    setState({
      rePassword: {
        value: isConditionInputTextValid ? inputText : false,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: isConditionInputTextValid ? '' : 'Kata sandi salah.',
      },
    });
  };

  const _handlerPopUpError = (title: any, description: any) => {
    setState({
      popupData: {
        icon: Maskot1,
        title: title,
        description: description,
        labelConfirm: 'Kembali',
        onPressConfirm: () => {
          dispatch(changeForgetPasswordDestroy());
          setState({isShowPopup: false});
        },
      },
      isShowPopup: true,
    });
  };

  const _handlerPopUpSuccess = () => {
    setState({
      isShowPopup: true,
      popupData: {
        icon: Maskot2,
        title: 'HORE!',
        description: 'Kata sandi telah berhasil diubah.',
        labelConfirm: 'Masuk',
        onPressConfirm: () => {
          dispatch(changeForgetPasswordDestroy());
          navigation.replace('Autentikasi');
          setState({isShowPopup: false});
        },
      },
    });
  };

  const _handlerSubmitData = () => {
    dispatch(fetchChangeForgetPassword(requestBody));
  };
  useEffect(() => {
    return () => {
      dispatch(changeForgetPasswordDestroy());
    };
  }, []);

  useEffect(() => {
    if (
      changeForgetPassword?.error?.code &&
      changeForgetPassword?.error?.code !== 100
    ) {
      const errorMessage = changeForgetPassword?.error?.message;
      const additionalErrorMessage =
        changeForgetPassword?.error?.message?.data?.message || '';

      _handlerPopUpError(errorMessage, additionalErrorMessage);
    }

    if (changeForgetPassword?.data?.code === 100) {
      const successMessage = changeForgetPassword?.data?.message;
      const additionalSuccessMessage =
        changeForgetPassword?.data?.message?.data?.message || '';

      _handlerPopUpSuccess(successMessage, additionalSuccessMessage);
    }
  }, [changeForgetPassword]);

  return {
    popupData,
    isShowPopup,
    currentPassword,
    newPassword,
    rePassword,
    isAllInputNotValid,
    _handlerValidateCurrentPassword,
    _handlerValidateNewPassword,
    _handlerValidateRePassword,
    _handlerSubmitData,
  };
};

export default useForgotPassword;
