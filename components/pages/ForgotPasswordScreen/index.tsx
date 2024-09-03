import {Button, InputText, PopUp} from '@components/atoms';
import React from 'react';
import ChecklistGrey from '@assets/svg/ic_checklist_grey.svg';
import ChecklistGreen from '@assets/svg/ic_checklist_green.svg';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import useInputPassword from './useForgotPassword';
import Colors from '@constants/colors';
import Ic_1 from '@assets/svg/ic_logo_forgot_1.svg';
const ForgotPasswordScreen = ({}) => {
  const {
    popupData,
    isShowPopup,
    newPassword,
    rePassword,
    isAllInputNotValid,
    _handlerValidateNewPassword,
    _handlerValidateRePassword,
    _handlerSubmitData,
  } = useInputPassword();

  const {snkPassword} = newPassword;

  const passwordRequiredCondition = [
    {
      isValid: snkPassword[0] || false,
      label: 'Panjang minimal 8 karakter',
    },
    {
      isValid: snkPassword[1] || false,
      label: 'Huruf besar & huruf kecil, dan angka',
    },
  ];

  const _renderRequiredPassword = () => {
    return (
      <View style={styles.requiredPasswordContainer}>
        <Text style={styles.requirePasswordTitle}>
          Kata Sandi Baru harus memiliki:
        </Text>
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
            <View>
              <Ic_1 width={100} height={100} style={{alignSelf: 'center'}} />
              <Text style={styles.title}>Buat Kata Sandi Baru</Text>
              <Text style={styles.subtitle}>
                Tips: Kata sandi baru harus berbeda dengan kata sandi
                sebelumnya.
              </Text>
            </View>
            <InputText
              maskEntry
              secure
              isNotOutline
              label={'Kata Sandi'}
              onChangeText={text => {
                _handlerValidateNewPassword(text);
              }}
              maxLength={16}
              bottom={12}
            />

            {_renderRequiredPassword()}

            <InputText
              maskEntry
              secure
              isNotOutline
              disabled={!newPassword?.value}
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
            isDisabled={isAllInputNotValid}
            action={_handlerSubmitData}
            label={'Simpan'}
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

export {ForgotPasswordScreen};
