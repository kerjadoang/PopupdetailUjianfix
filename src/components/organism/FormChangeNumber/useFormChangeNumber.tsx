import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchChangeNumberOTP} from '@redux';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import {getToken} from '@hooks/getToken';
import {
  regexOnlyNumber,
  regexPhoneIndonesia,
  regexPhoneStart62,
} from '@constants/functional';
import api from '@api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {URL_PATH} from '@constants/url';
interface RootState {
  changeNumberOTP: any;
}
const useFormChangeNumber = () => {
  const navigation: any = useNavigation();
  const [decodeData, setDecodeData] = useState(false);
  const [valid, setValid] = useState(false);
  const [validAlready, setValidAlready] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    username: decodeData?.fullname,
    phone_number: '',
    disable: true,
  });
  // useEffect(() => {
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setErrorMessage(
  //         valid
  //           ? validAlready
  //             ? 'No HP Sudah Terdaftar'
  //             : ''
  //           : 'Penulisan No HP salah',
  //       );
  //     },
  //   );
  //   return () => {
  //     keyboardDidHideListener.remove();
  //   };
  // }, [valid, validAlready]);

  const {changeNumberOTP} = useSelector((state: RootState) => state);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getToken();
        const decoded: any = jwtDecode(data) as {avatar: string};

        setDecodeData(decoded);
      } catch (error) {}
    };
    fetchData();
  }, [changeNumberOTP]);

  const dispatch = useDispatch();

  const handleuserChange = (e: any) => {
    setForm({
      ...form,
      phone_number: e.replace(/^0/, '+62'),
    });
    validationNumber(e.replace(/^0/, '+62'));
    return;
  };

  useEffect(() => {
    if (_handlerValidatePhoneNumber(form.phone_number, validAlready)) {
      return setForm({
        ...form,
        disable: false,
      });
    }
    return setForm({
      ...form,
      disable: true,
    });
  }, [form.phone_number]);

  const submit = (numberPhone: any) => {
    if (!valid || validAlready) {
      setErrorMessage(
        valid
          ? validAlready
            ? 'No HP Sudah Terdaftar'
            : ''
          : 'Penulisan No HP salah',
      );
      return;
    }
    dispatch(fetchChangeNumberOTP(numberPhone));
    if (changeNumberOTP?.loading) {
    } else {
      proses();
    }
  };

  const _handlerValidatePhoneNumber = (number: any, already: any) => {
    const isNotOnlyNumber = regexOnlyNumber.test(number);
    const isConditionNumberStartWith62 = regexPhoneStart62.test(number);
    const isConditionNumberLengthMin10 = number.length > 10;
    const isAllConditionValid =
      !isNotOnlyNumber &&
      isConditionNumberStartWith62 &&
      isConditionNumberLengthMin10 &&
      already;
    return isAllConditionValid;
  };

  function validationNumber(value: any) {
    setValid(regexPhoneIndonesia.test(value));
    validationPhoneAlready(value);
  }

  const validationPhoneAlready = async (value: any) => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    const requestBody = {
      username: value,
    };
    const response = await api.post(URL_PATH.post_check_username, requestBody, {
      headers: {
        Authorization: `Bearer ${tokenParse}`,
      },
    });
    if (response?.status === 200) {
      setValidAlready(true);
    } else {
      setValidAlready(false);
    }
  };

  const proses = () => {
    navigation.navigate('VerificationScreen', {
      screenName: 'ChangeNumberScreen',
      phoneNumber: form?.phone_number,
    });
  };

  return {
    form,
    handleuserChange,
    submit,
    decodeData,
    valid,
    errorMessage,
    validAlready,
  };
};

export default useFormChangeNumber;
