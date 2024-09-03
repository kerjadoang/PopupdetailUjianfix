import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authenticationDestroy, fetchAuthentication} from '@redux';
import {useNavigation} from '@react-navigation/native';
import {
  isStringContains,
  regexEmail,
  regexPhoneIndonesia,
} from '@constants/functional';
import {Keyboard} from 'react-native';
import {RootState} from 'src/redux/rootReducer';
import {INavigation} from 'type/screen';
const Service = () => {
  const navigation = useNavigation<INavigation<'LoginScreen'>>();
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setNumber] = useState(false);
  const [form, setForm] = useState({
    username: '',
  });

  const authentication: any = useSelector(
    (state: RootState) => state?.authentication,
  );
  const data: any = useSelector(
    (state: any) => state?.authentication?.data?.data,
  );
  const dispatch = useDispatch();

  function validationEmail(value: any) {
    setValid(regexEmail.test(value));
    setForm({username: value});
    setNumber(false);
  }
  function validationNumber(value: any) {
    setValid(regexPhoneIndonesia.test(value));
    setValid(true);
    setForm({username: value});
    setNumber(true);
  }
  const submit = (username: string | number) => {
    // if (number) {
    // dispatch(fetchAuthentication(username.replace(/^0/, '+62')));
    // return;
    // }

    dispatch(fetchAuthentication(username));
    return;
  };

  const handleuserChange = useCallback((e: string) => {
    if (isNaN(Number(e))) {
      return validationEmail(e);
    }
    return validationNumber(e);
  }, []);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setErrorMessage(valid === true ? '' : 'Penulisan No HP/Email Salah');
      },
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [valid]);

  useEffect(() => {
    if (authentication?.loading) {
      return setLoading(true);
    }
    if (authentication?.error === '') {
      // auto add admin prefix in DEV MODE
      const mappedUsername =
        !__DEV__ || isStringContains(form?.username, ':')
          ? form?.username
          : form?.username + ':admin';

      navigation.navigate('LoginScreen', {
        ...data,
        // username: form?.username.replace(/^0/, '+62'),
        username: mappedUsername,
        fullname: data?.full_name,
        rolename: data?.role_name,
        phone_number: data?.phone_number,
        avatar: data?.avatar,
      });
      setLoading(false);
      dispatch(authenticationDestroy());
      return;
    }
    if (authentication?.error !== null) {
      navigation.navigate('SelectRoleScreen', {
        // username: form?.username.replace(/^0/, '+62'),
        username: form?.username,
        fullname: data?.full_name,
        rolename: data?.role_name,
        phone_number: data?.phone_number,
      });
      setLoading(false);
      dispatch(authenticationDestroy());
      return;
    }
  }, [
    authentication,
    data?.avatar,
    data?.full_name,
    data?.phone_number,
    data?.role_name,
    dispatch,
    form?.username,
    navigation,
    data,
  ]);

  useEffect(() => {
    return () => {
      dispatch(authenticationDestroy());
    };
  }, [dispatch]);

  return {
    valid,
    form,
    handleuserChange,
    setValid,
    submit,
    loading,
    errorMessage,
  };
};

export default Service;
