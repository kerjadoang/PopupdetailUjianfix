import React from 'react';
import {iconStudent, iconTeacher} from '@assets/images';
import {Button, InputText, PopUp, Stepper} from '@components/atoms';
import {CCheckBox} from '@components/atoms/CCheckBox';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import usePersonalData from './usePersonalData';
import Colors from '@constants/colors';

const PersonalDataScreen = ({}) => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const {userTypeId}: any = route?.params || false;
  const isTypeStudent = userTypeId === 1;
  const {
    isShowPopup,
    popupData,
    phoneNumber,
    fullName,
    isAgreeWithTnC,
    isFullNameNotError,
    isAllInputValid,
    _handlerCheckButton,
    _handlerValidatePhoneNumber,
    _handlerValidateFullName,
    _handlerSubmitData,
  } = usePersonalData();

  const isStartWith62 =
    phoneNumber.value.substring(0, 3) == '+62'
      ? phoneNumber?.value
      : `+62${phoneNumber?.value}`;

  const _renderScreen = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <Header />

        <View style={styles.container}>
          <View>
            <Stepper
              active={1}
              labels={
                isTypeStudent
                  ? ['Data Diri', 'Kelas', 'Kata Sandi', 'Verifikasi']
                  : ['Data Diri', 'Kata Sandi', 'Verifikasi']
              }
            />

            <Image
              style={styles.image}
              source={isTypeStudent ? iconStudent : iconTeacher}
            />

            <Text style={styles.title}>{'Isi Data Diri'}</Text>

            <Text style={styles.subtitle}>
              {
                'Pastikan nomor handphone terhubung dengan WhatsApp untuk verifikasi kode.'
              }
            </Text>

            <InputText
              isNotOutline
              label={'No. HP'}
              value={isStartWith62}
              onChangeText={text => {
                _handlerValidatePhoneNumber(text);
              }}
              error={phoneNumber?.errorMessage}
              errorMessage={phoneNumber?.errorMessage}
              placeholderTextColor={Colors.dark.neutral50}
              keyboardType={'phone-pad'}
              maxLength={16}
              placeholder={'+62'}
              bottom={24}
            />

            <InputText
              isNotOutline
              label={'Nama Lengkap'}
              maxLength={32}
              onChangeText={text => {
                _handlerValidateFullName(text);
              }}
              value={fullName?.value}
              error={fullName?.errorMessage}
              errorMessage={fullName?.errorMessage}
              placeholderTextColor={Colors.dark.neutral50}
              placeholder={'Andi Santoso'}
              bottom={isFullNameNotError ? 4 : 16}
            />

            {isFullNameNotError ? (
              <Text style={styles.inputNote}>{'Minimal 2 karakter.'}</Text>
            ) : null}

            <View style={styles.tncContainer}>
              <CCheckBox
                onPressCheck={_handlerCheckButton}
                isChecked={isAgreeWithTnC}
                right={8}
              />

              <Text style={styles.agreement}>{'Saya setuju dengan'}</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PusatBantuanScreen', {
                    type: 'WEBVIEW',
                    webviewUrl: 'https://www.kelaspintar.id/terms-of-use',
                    title: 'Syarat & Ketentuan',
                  });
                }}>
                <Text style={styles.tnc}>{' Syarat & Ketentuan'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            isDisabled={!isAllInputValid}
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

export {PersonalDataScreen};
