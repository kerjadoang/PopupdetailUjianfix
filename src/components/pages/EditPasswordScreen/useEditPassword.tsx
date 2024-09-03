import {
  EncryptMD5,
  regexContainLowerUpperCase,
  regexContainNumber,
  useMergeState,
} from '@constants/functional';
import {useNavigation} from '@react-navigation/native';
import {changePasswordDestroy, fetchChangePassword} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import provider from '@services/uaa/provider';
interface RootState {
  changePassword: any;
}

const useEditPassword = () => {
  const dispatch = useDispatch();
  const {changePassword} = useSelector((state: RootState) => state);

  const [state, setState] = useMergeState({
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
    isShowSnackBarSuccess: false,
    snackBarLabel: false,
  });
  const {
    currentPassword,
    newPassword,
    rePassword,
    popupData,
    isShowPopup,
    isShowSnackBarSuccess,
    snackBarLabel,
  } = state;
  const navigation: any = useNavigation();
  const isAllInputNotValid = !newPassword?.isValid || !rePassword?.isValid;
  const requestBody = {
    new_password: EncryptMD5(newPassword?.value),
    old_password: EncryptMD5(currentPassword?.value),
  };

  const _handlerValidateCurrentPassword = (text: string) => {
    const inputText = text.trim();
    const isConditionInputTextValid = inputText?.length > 0;

    setState({
      currentPassword: {
        value: isConditionInputTextValid ? inputText : false,
        isValid: isConditionInputTextValid,
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
        isValid: isConditionInputTextValid,
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
        isValid: isConditionInputTextValid,
        errorMessage: isConditionInputTextValid ? '' : 'Kata sandi salah.',
      },
    });
  };

  const _handlerSubmitData = () => {
    dispatch(fetchChangePassword(requestBody));
  };

  useEffect(() => {
    if (changePassword?.error && changePassword?.error?.code != 100) {
      dispatch(changePasswordDestroy());
      setState({
        currentPassword: {
          value: currentPassword?.value,
          isValid: false,
          errorMessage:
            changePassword?.error?.message ||
            changePassword?.error?.message?.data?.message ||
            '',
        },
      });
    }

    if (changePassword?.data?.code == 100) {
      dispatch(changePasswordDestroy());
      setState({
        isShowSnackBarSuccess: true,
        snackBarLabel: 'Kata sandi berhasil diubah.',
      });

      setTimeout(() => {
        setState({
          isShowSnackBarSuccess: false,
        });
        navigation.navigate('Profil', {});
      }, 4000);
    }
  }, [changePassword]);

  const _handlerCloseSnackBar = () => {
    dispatch(changePasswordDestroy());

    setTimeout(() => {
      setState({
        isShowSnackBarSuccess: false,
      });
      navigation.navigate('Profil', {});
    }, 4000);
  };

  const _handlerCheckCurrentPassword = async () => {
    try {
      const requestBody = {
        password: EncryptMD5(currentPassword?.value),
      };

      await provider.postCheckPassword(requestBody);
    } catch (e: any) {
      const errorResponseData = e?.response?.data;

      setState({
        currentPassword: {
          value: currentPassword?.value,
          isValid: false,
          errorMessage: errorResponseData?.message,
        },
      });
    }
  };

  return {
    popupData,
    isShowPopup,
    currentPassword,
    newPassword,
    rePassword,
    isAllInputNotValid,
    isShowSnackBarSuccess,
    snackBarLabel,
    _handlerCloseSnackBar,
    _handlerCheckCurrentPassword,
    _handlerValidateCurrentPassword,
    _handlerValidateNewPassword,
    _handlerValidateRePassword,
    _handlerSubmitData,
  };
};

export default useEditPassword;
