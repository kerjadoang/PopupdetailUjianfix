import {
  regexFullName,
  regexOnlyNumber,
  useMergeState,
} from '@constants/functional';
import Maskot1 from '@assets/svg/maskot_1.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {checkPhoneNumberDestroy, fetchCheckPhoneNumber} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
interface RootState {
  checkPhoneNumber: any;
}
const usePersonalData = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PersonalDataScreen'>>();
  const dispatch = useDispatch();
  const route = useRoute();
  const {userName, userTypeId}: any = route?.params || false;
  const phoneUser =
    userName.substring(0, 1) == '0'
      ? `+62${userName.substring(1, userName.length)}`
      : userName.substring(0, 2) == '62'
      ? `+62${userName.substring(2, userName.length)}`
      : userName;

  const [state, setState] = useMergeState({
    phoneNumber: {
      value: '',
      isValid: false,
      errorMessage: '',
    },
    fullName: {
      value: '',
      isValid: false,
      errorMessage: '',
    },
    isAgreeWithTnC: false,
    popupData: false,
    isShowPopup: false,
  });
  const {popupData, isShowPopup, phoneNumber, fullName, isAgreeWithTnC} = state;
  const isTypeStudent = userTypeId === 1;

  const isAllInputValid =
    fullName?.isValid && phoneNumber?.isValid && isAgreeWithTnC;
  const isFullNameNotError = fullName?.errorMessage?.length === 0;

  useEffect(() => {
    !isNaN(userName) && _handlerValidatePhoneNumber(phoneUser);
  }, []);

  const _handlerCheckButton = () => {
    setState({
      isAgreeWithTnC: !isAgreeWithTnC,
    });
  };

  const _handlerValidatePhoneNumber = (number: any) => {
    const numberAfterPlus = number.substring(1, number.length);
    const isNotOnlyNumber = regexOnlyNumber.test(numberAfterPlus);
    const isConditionNumberStartWith62 = number.substring(0, 3) == '+62';
    const isConditionNumberLengthMin10 = number.length > 10;
    const isAllConditionValid =
      !isNotOnlyNumber &&
      isConditionNumberStartWith62 &&
      isConditionNumberLengthMin10;

    setState({
      phoneNumber: {
        value: number.length > 3 ? number : '+62',
        isValid: isAllConditionValid ? true : false,
        errorMessage: !isConditionNumberStartWith62
          ? 'No. HP diawali +62'
          : isNotOnlyNumber
          ? 'Penulisan nomor HP salah'
          : !isConditionNumberLengthMin10
          ? 'No. HP kurang dari 10 digit'
          : '',
      },
    });
    return isAllConditionValid;
  };

  const _handlerValidateFullName = (text: string) => {
    const isContainSpecialCharacter = regexFullName.test(text);
    const isFullNameLengthNotMin2 = text.length >= 2;
    const isAllConditionValid =
      !isContainSpecialCharacter && isFullNameLengthNotMin2;

    setState({
      fullName: {
        value: text,
        isValid: isAllConditionValid ? true : false,
        errorMessage: !isFullNameLengthNotMin2
          ? 'Minimal 2 karakter.'
          : isContainSpecialCharacter
          ? 'Nama tidak boleh mengandung angka/simbol.'
          : '',
      },
    });
    return isAllConditionValid;
  };

  // get state of redux
  const checkPhoneNumber = useSelector(
    (state: RootState) => state?.checkPhoneNumber.data,
  );

  const requestBody = {
    phone_number: phoneNumber?.value,
  };

  useEffect(() => {
    if (checkPhoneNumber?.is_exist == true) {
      setState({
        popupData: {
          icon: Maskot1,
          title: 'Nomor Sudah Terdaftar',
          description:
            'Silakan masuk ke akun menggunakan nomor handphone yang terdaftar.',
          labelConfirm: 'Masuk',
          labelCancel: 'Kembali',
          onPressConfirm: () => {
            dispatch(checkPhoneNumberDestroy());
            navigation.navigate('Autentikasi', {});
          },
          onPressCancel: () => {
            dispatch(checkPhoneNumberDestroy());
            setState({isShowPopup: false});
          },
        },
        isShowPopup: true,
      });
    } else if (checkPhoneNumber?.is_exist === false) {
      dispatch(checkPhoneNumberDestroy());
      navigation.navigate(
        isTypeStudent ? 'ClassScreen' : 'InputPasswordScreen',
        {
          userName: !isNaN(userName) ? phoneNumber?.value : userName,
          fullName: fullName?.value,
          userTypeId: userTypeId,
          phoneNumber: phoneNumber?.value,
        },
      );
    }
  }, [checkPhoneNumber]);

  const _handlerSubmitData = () => {
    dispatch(fetchCheckPhoneNumber(requestBody));
  };

  return {
    popupData,
    isShowPopup,
    phoneNumber,
    fullName,
    isAgreeWithTnC,
    isFullNameNotError,
    isAllInputValid,
    _handlerCheckButton,
    _handlerValidatePhoneNumber,
    _handlerValidateFullName,
    _handlerSubmitData,
  };
};

export default usePersonalData;
