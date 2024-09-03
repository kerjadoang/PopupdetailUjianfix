import {
  EncryptMD5,
  fmcToken,
  regexContainLowerUpperCase,
  regexContainNumber,
  useMergeState,
} from '@constants/functional';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchPreRegister, preRegisterDestroy} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import Maskot1 from '@assets/svg/maskot_1.svg';
import {useEffect} from 'react';
import dayjs from 'dayjs';

interface RootState {
  preRegister: any;
}
const useInputPassword = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {userName, fullName, userTypeId, phoneNumber, userClass}: any =
    route?.params || false;

  const [state, setState] = useMergeState({
    password: {
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
  });
  const {password, rePassword, popupData, isShowPopup} = state;
  const navigation: any = useNavigation();

  const isUserTypeStudent = userClass &&
    userTypeId === 1 && {class_id: parseInt(userClass)};
  const userNameSplit = userName.split('');

  const requestBody = {
    username: userName,
    phone_number: phoneNumber,
    full_name: fullName || '',
    email: userNameSplit?.includes('@') ? userName : '',
    password: EncryptMD5(password?.value),
    ...isUserTypeStudent,
    user_type_id: userTypeId,
    fcm_token: fmcToken,
    region: dayjs.tz.guess(),
  };

  const _handlerValidatePassword = (text: any) => {
    const inputText = text.trim();
    const isFirstConditionValid = inputText.length >= 8;
    const isSecondConditionValid =
      regexContainLowerUpperCase.test(inputText) && inputText?.length > 0;
    const isThirdConditionValid =
      regexContainNumber.test(inputText) && inputText?.length > 0;
    const isConditionInputTextValid =
      isFirstConditionValid && isSecondConditionValid && isThirdConditionValid;

    setState({
      password: {
        value: isConditionInputTextValid ? inputText : false,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: '',
        snkPassword: [
          isFirstConditionValid,
          isSecondConditionValid,
          isThirdConditionValid,
        ],
      },
    });
  };

  const _handlerValidateRePassword = (text: string) => {
    const inputText = text.trim();
    const isConditionInputTextValid =
      password?.value === inputText || inputText === password?.value;

    setState({
      rePassword: {
        value: isConditionInputTextValid ? inputText : false,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: isConditionInputTextValid ? '' : 'Kata sandi salah.',
      },
    });
  };

  // get state of redux
  const {preRegister} = useSelector((state: RootState) => state);

  const _handlerSubmitData = () => {
    dispatch(fetchPreRegister(requestBody));
  };

  const _handlerPopUpError = (title: any, description: any) => {
    setState({
      popupData: {
        icon: Maskot1,
        title: title,
        description: description,
        labelConfirm: 'Masuk',
        labelCancel: 'Kembali',
        onPressConfirm: () => {
          dispatch(preRegisterDestroy());
          navigation.navigate('Autentikasi', {});
        },
        onPressCancel: () => {
          dispatch(preRegisterDestroy());
          setState({isShowPopup: false});
        },
      },
      isShowPopup: true,
    });
  };

  useEffect(() => {
    if (preRegister?.error?.code) {
      _handlerPopUpError(
        preRegister?.error?.message,
        preRegister?.error?.message?.data?.message || '',
      );
    } else if (preRegister?.data?.user_id) {
      dispatch(preRegisterDestroy());
      navigation.replace('VerificationRegisterScreen', {
        phoneNumber: phoneNumber,
        userTypeId: userTypeId,
      });
    }
  }, [preRegister]);

  return {
    preRegister,
    popupData,
    isShowPopup,
    _handlerValidatePassword,
    _handlerValidateRePassword,
    _handlerSubmitData,
    password,
    rePassword,
  };
};

export default useInputPassword;
