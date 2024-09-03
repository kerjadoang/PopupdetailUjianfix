import React from 'react';
import ChecklistGrey from '@assets/svg/ic_checklist_grey.svg';
import ChecklistGreen from '@assets/svg/ic_checklist_green.svg';
import useInputPassword from './useEditPassword';
import Colors from '@constants/colors';
import SnackbarResult from '@components/atoms/SnackbarResult';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import {ScrollView, Text, View} from 'react-native';
import {Button, InputText, PopUp} from '@components/atoms';

const EditPasswordScreen = ({}) => {
  const {
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
        <Text style={styles.requireHeadPasswordTitle}>
          {'Kata Sandi Baru harus memiliki:'}
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
        <Header label={'Ubah Kata Sandi'} />

        <View style={styles.container}>
          <View>
            <InputText
              secure
              maskEntry
              isNotOutline
              label={'Kata Sandi Saat Ini'}
              value={currentPassword?.value}
              error={!currentPassword?.isValid}
              errorMessage={currentPassword?.errorMessage}
              onChangeText={text => {
                _handlerValidateCurrentPassword(text);
              }}
              onBlur={() => {
                _handlerCheckCurrentPassword();
              }}
              maxLength={16}
              bottom={24}
              top={18}
            />

            <InputText
              secure
              maskEntry
              isNotOutline
              label={'Kata Sandi Baru'}
              onChangeText={text => {
                _handlerValidateNewPassword(text);
              }}
              maxLength={16}
              bottom={12}
            />

            {_renderRequiredPassword()}

            <InputText
              secure
              maskEntry
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

        <SnackbarResult
          visible={isShowSnackBarSuccess}
          onPressClose={_handlerCloseSnackBar}
          label={snackBarLabel}
        />
      </ScrollView>
    );
  };

  return _renderScreen();
};

export {EditPasswordScreen};
