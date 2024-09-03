import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import useRemoveAccount from '../useRemoveAccount';
import {Button, Header, OTP} from '@components/atoms';
import Colors from '@constants/colors';
import {styles} from '../styles';
import Logo from '@assets/svg/maskot_7.svg';
import CTimer from '@components/atoms/CTimer';

const RemoveAccountOTPScreen = () => {
  const {
    navigation,
    _handlerOnFinishedCountDown,
    _handlerResendOTP,
    _handlerValidateOtp,
    isCountDownRunning,
    phoneNumber,
    countDownTime,
    errorMessage,
    _handleConfirmButton,
  } = useRemoveAccount();

  const isDisableCountDown = isCountDownRunning;
  const formattedPhoneNumber = phoneNumber?.replace('+62', '0');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Hapus Akun'} />,
    });
  }, [navigation]);

  const _renderOTPSection = () => {
    return (
      <View>
        <Logo width={100} height={100} style={styles.maskotIcon} />
        <Text style={styles.title}>{'Verifikasi Kode OTP'}</Text>
        <Text style={styles.subtitle}>
          <Text style={styles.subtitle}>
            Masukkan 4 digit kode OTP yang dikirim ke nomor WhatsApp{' '}
            <Text style={[styles.subtitle, {fontFamily: 'Poppins-Bold'}]}>
              {formattedPhoneNumber}
            </Text>
          </Text>
        </Text>
        <View style={styles.otpContainer}>
          <OTP
            length={4}
            onCodeChanged={otp => {
              _handlerValidateOtp(otp);
            }}
            errorMessage={errorMessage}
          />
        </View>

        {isCountDownRunning ? (
          <CTimer
            containerStyle={styles.cTimer}
            time={countDownTime}
            type={{
              minutes: true,
              seconds: true,
            }}
            onFinished={_handlerOnFinishedCountDown}
            color={Colors.dark.neutral80}
          />
        ) : null}

        <View style={styles.resendContainer}>
          <Text style={styles.resendTitle}>{'Tidak menerima OTP? '}</Text>
          <TouchableOpacity
            disabled={isDisableCountDown}
            onPress={_handlerResendOTP}>
            <Text
              style={{
                ...styles.resendTitle,
                color: isDisableCountDown
                  ? Colors.dark.neutral50
                  : Colors.primary.base,
              }}>
              {'Kirim ulang!'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        {_renderOTPSection()}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button
          label="Konfirmasi"
          style={styles.button}
          action={() => _handleConfirmButton()}
        />
      </View>
    </View>
  );
};

export {RemoveAccountOTPScreen};
