/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useLayoutEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {
  deepClone,
  isStringContains,
  regexEmail,
  regexFullName,
  regexPhoneIndonesia,
  useMergeState,
} from '@constants/functional';
import {
  fetchClassByDegree,
  fetchGetDomicile,
  sendRegisterDiagnostic,
} from '@redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms';
import React from 'react';
import {ParamList} from 'type/screen';
import {defaultValidateForm} from './utils';
import useDebounce from '@hooks/useDebounce';

const useScreen = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'FormDiagnosticTestScreen'>>();
  const [domicileName, setDomicileName] = useState<string>('');
  const [userDomicile, setUserDomicile] = useState<string>('');
  const [showDomicile, setShowDomicile] = useState(false);
  const [showAgree, setShowAgree] = useState(false);

  const [validateForm, setValidateForm] = useState<IFormPersonalDataStatus>(
    deepClone(defaultValidateForm),
  );

  const {getUser, domicile, checkDiagnostic}: any = useSelector(
    (state: RootState) => state,
  );

  const user = getUser?.data;

  const [state, setState] = useMergeState({
    email: user.email,
    fullname: user.full_name,
    student_phone: user.phone_number,
    parent_phone: '+62',
    gender: user.gender,
    class_id: user.class_id,
    className: user.class?.order,
    major: user.class?.major?.name,
    isAgree: false,
    domicileId: user.domicile_id || 0,
    domicileName: '',
    searchDomicile: '',
    swipeDomicile: false,
  });

  const {
    email,
    className,
    major,
    fullname,
    student_phone,
    parent_phone,
    gender,
    isAgree,
    domicileId,
    class_id,
  }: any = state;

  const qDomicileName = useDebounce(domicileName, 50);

  useEffect(() => {
    dispatch(fetchClassByDegree(3));
  }, []);

  // USER MEMILIH KELAS
  const classList = [10, 11, 12];
  const majorList = ['IPA', 'IPS'];
  const genderList = [
    {label: 'Perempuan', value: 'P'},
    {label: 'Laki-Laki', value: 'L'},
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Lengkapi Data Diri Kamu'} />,
    });
  }, [navigation]);

  useEffect(() => {
    // if (!qDomicileName) {
    //   return;
    // }
    dispatch(fetchGetDomicile(qDomicileName));
  }, [qDomicileName]);

  useEffect(() => {
    let userDomName = '';
    if (domicileId) {
      const selectedDomicile = domicile?.data?.data?.filter(
        (item: any, _: number) => item?.id === domicileId,
      );
      userDomName = selectedDomicile?.[0]?.name;
      setDomicileName(userDomName);
      setUserDomicile(userDomName);
    }
    dispatch(fetchGetDomicile(userDomName));
  }, []);

  const isFormValid = () => {
    let isValid = true;
    const tempValidForm: IFormPersonalDataStatus =
      deepClone(defaultValidateForm);
    if (!regexEmail.test(email)) {
      tempValidForm.isEmailValid = false;
      isValid = false;
    }

    if (
      fullname.length <= 3 &&
      !regexFullName.test(fullname) &&
      fullname.length >= 50
    ) {
      tempValidForm.isNameValid = false;
      isValid = false;
    }

    if (!regexPhoneIndonesia.test(student_phone)) {
      tempValidForm.isStudentPhoneValid = false;
      isValid = false;
    }

    if (!regexPhoneIndonesia.test(parent_phone)) {
      tempValidForm.isParentPhoneValid = false;
      isValid = false;
    }

    if (isStringContains(major, '-')) {
      tempValidForm.isMajorValid = false;
      isValid = false;
    }

    if (!domicileName) {
      tempValidForm.isDomicileValid = false;
      isValid = false;
    }

    if (!gender) {
      tempValidForm.isGenderValid = false;
      isValid = false;
    }

    if (!className) {
      tempValidForm.isClassNameValid = false;
      isValid = false;
    }

    setValidateForm(tempValidForm);

    return isValid;
  };

  const resetForm = () => {
    setValidateForm(defaultValidateForm);
  };

  const _handlerSubmitRegister = () => {
    resetForm();

    if (!isFormValid()) {
      return;
    }

    if (!isAgree) {
      setShowAgree(true);
      setTimeout(() => {
        setShowAgree(false);
      }, 1000);
      return;
    }

    dispatch(
      sendRegisterDiagnostic(
        {
          email: email,
          fullname: fullname,
          student_phone_number: student_phone,
          parent_phone_number: parent_phone,
          class_id: class_id,
          gender: gender,
          domicile_id: domicileId,
        },
        () => {
          navigation.replace('DiagnoticTestScreen', {gender: gender});
          return;
        },
      ),
    );
    if (checkDiagnostic) {
      const validationTest = checkDiagnostic?.data?.data;
      if (
        validationTest?.already_finished_test &&
        validationTest?.already_register
      ) {
        navigation.replace('DiagnoticTestResultScreen', {data: {}});
      } else {
        navigation.replace('DiagnoticTestScreen', {gender: gender});
      }
    }
  };

  const onPressTermsAndCondition = () => {
    navigation.navigate('PusatBantuanScreen', {
      type: 'WEBVIEW',
      webviewUrl: 'https://www.kelaspintar.id/syarat-dan-ketentuan',
      title: 'Syarat & Ketentuan',
    });
  };

  const isOnlyPrefixNumber = (text: string) => {
    let prefixIdx = text.indexOf('+62');

    if (prefixIdx === -1) {
      return true;
    }

    prefixIdx = text.indexOf('+620');
    if (prefixIdx === 0) {
      return true;
    }

    return false;
  };

  return {
    email,
    fullname,
    student_phone,
    gender,
    classList,
    majorList,
    genderList,
    parent_phone,
    setState,
    className,
    isAgree,
    major,
    domicileId,
    dispatch,
    domicile,
    class_id,
    checkDiagnostic,
    validateForm,
    setValidateForm,
    domicileName,
    setDomicileName,
    showDomicile,
    setShowDomicile,
    _handlerSubmitRegister,
    showAgree,
    setShowAgree,
    navigation,
    onPressTermsAndCondition,
    resetForm,
    isOnlyPrefixNumber,
    userDomicile,
    setUserDomicile,
    qDomicileName,
  };
};
export {useScreen};
