import {Button, InputText, PopUp, Stepper} from '@components/atoms';
import React from 'react';
import ChecklistGrey from '@assets/svg/ic_checklist_grey.svg';
import ChecklistGreen from '@assets/svg/ic_checklist_green.svg';
import Logo from '@assets/svg/maskot_3.svg';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import {useRoute} from '@react-navigation/native';
import useInputPassword from './useInputPassword';
import Colors from '@constants/colors';

const InputPasswordScreen = ({}) => {
  const route = useRoute();
  const {userTypeId}: any = route?.params || false;
  const isTypeStudent = userTypeId === 1;
  const {
    popupData,
    isShowPopup,
    _handlerValidatePassword,
    _handlerValidateRePassword,
    _handlerSubmitData,
    password,
    rePassword,
  } = useInputPassword();

  const {snkPassword} = password;
  const passwordRequiredCondition = [
    {
      isValid: snkPassword[0] || false,
      label: 'Panjang minimal 8 karakter',
    },
    {
      isValid: snkPassword[1] || false,
      label: 'Terdiri dari huruf besar & huruf kecil',
    },
    {
      isValid: snkPassword[2] || false,
      label: 'Terdiri dari angka',
    },
  ];

  const _renderRequiredPassword = () => {
    return (
      <View style={styles.requiredPasswordContainer}>
        {passwordRequiredCondition.map((value: any, index: any) => {
          const {isValid, label} = value;
          return (
            <View key={index} style={styles.requiredPassword}>
              {isValid ? (
                <ChecklistGreen style={styles.checklistGrey} />
              ) : (
                <ChecklistGrey style={styles.checklistGrey} />
              )}
              <Text
                style={{
                  ...styles.requirePasswordTitle,
                  color: isValid
                    ? Colors.success.light1
                    : Colors.dark.neutral60,
                }}>
                {label}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const _renderScreen = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <Header />

        <View style={styles.container}>
          <View>
            <Stepper
              active={isTypeStudent ? 3 : 2}
              labels={
                isTypeStudent
                  ? ['Data Diri', 'Kelas', 'Kata Sandi', 'Verifikasi']
                  : ['Data Diri', 'Kata Sandi', 'Verifikasi']
              }
            />

            <Logo width={80} height={80} style={styles.iconMaskot} />

            <Text style={styles.title}>{'Buat Kata Sandi'}</Text>

            <Text style={styles.subtitle}>
              {'Tips: Buat kata sandi yang mudah diingat tetapi sulit ditebak.'}
            </Text>

            <InputText
              secure
              maskEntry
              isNotOutline
              label={'Kata Sandi'}
              onChangeText={text => {
                _handlerValidatePassword(text);
              }}
              maxLength={16}
              bottom={12}
            />

            {_renderRequiredPassword()}

            <InputText
              secure
              maskEntry
              isNotOutline
              disabled={!password?.value}
              label={'Ulangi Kata Sandi'}
              error={!rePassword?.isValid}
              errorMessage={rePassword?.errorMessage}
              maxLength={32}
              onChangeText={text => {
                _handlerValidateRePassword(text);
              }}
              bottom={36}
            />
          </View>

          <Button
            isDisabled={!password?.isValid || !rePassword?.isValid}
            action={_handlerSubmitData}
            label={'Lanjut'}
          />
        </View>

        <PopUp
          show={isShowPopup}
          Icon={popupData?.icon}
          title={popupData?.title}
          desc={popupData?.description}
          titleConfirm={popupData?.labelConfirm}
          actionConfirm={popupData?.onPressConfirm}
          titleCancel={popupData?.labelCancel}
          actionCancel={popupData?.onPressCancel}
        />
      </ScrollView>
    );
  };

  return _renderScreen();
};

export {InputPasswordScreen};
