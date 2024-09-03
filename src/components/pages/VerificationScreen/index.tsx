import {Button, OTP, PopUp, Stepper} from '@components/atoms';
import React from 'react';
import Logo from '@assets/svg/maskot_7.svg';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './style';
import {TouchableOpacity} from 'react-native';
import Colors from '@constants/colors';
import {Header} from '@components/atoms/Header';
import {useRoute} from '@react-navigation/native';
import useVerification from './useVerification';
import CTimer from '@components/atoms/CTimer';

const VerificationScreen = ({}) => {
  const route = useRoute();
  const {phoneNumber, userTypeId, screenName}: any = route?.params || false;

  const {
    popupData,
    isShowPopup,
    countDownTime,
    isCountDownRunning,
    isBtnDisabled,
    isAllInputValid,
    _handlerValidateOtp,
    _handlerResendOTP,
    _handlerOnFinishedCountDown,
    _handlerSubmitData,
    errorMessage,
    onPressIconLeft,
  } = useVerification();
  const isDisableCountDown = isCountDownRunning;
  const isTypeStudent = userTypeId === 1;
  const formattedPhoneNumber = phoneNumber.replace('+62', '0');

  const _renderScreen = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Header onPressIconLeft={onPressIconLeft} />
        <View style={styles.container}>
          <View>
            {screenName === 'ChangeNumberScreen' ||
            screenName === 'forgotPass' ? null : (
              <Stepper
                active={isTypeStudent ? 4 : 3}
                labels={
                  isTypeStudent
                    ? ['Data Diri', 'Kelas', 'Kata Sandi', 'Verifikasi']
                    : ['Data Diri', 'Kata Sandi', 'Verifikasi']
                }
              />
            )}

            <Logo width={80} height={80} style={styles.maskotIcon} />

            <Text style={styles.title}>{'Verifikasi Kode OTP'}</Text>

            <Text style={styles.subtitle}>
              {screenName === 'forgotPass' ? (
                <Text style={styles.subtitle}>
                  Masukkan 4 digit kode OTP yang dikirim ke nomor WhatsApp{' '}
                  <Text style={[styles.subtitle, {fontFamily: 'Poppins-Bold'}]}>
                    {formattedPhoneNumber}
                  </Text>{' '}
                  untuk mengubah kata sandi
                </Text>
              ) : (
                <Text style={styles.subtitle}>
                  Masukkan 4 digit kode Verifikasi yang dikirim ke nomor
                  WhatsApp{' '}
                  <Text style={[styles.subtitle, {fontFamily: 'Poppins-Bold'}]}>
                    {formattedPhoneNumber}
                  </Text>{' '}
                  untuk mengubah nomor HP
                </Text>
              )}
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

          <Button
            isDisabled={isBtnDisabled || !isAllInputValid}
            action={_handlerSubmitData}
            label={screenName == 'forgotPass' ? 'Verifikasi' : 'Lanjut'}
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

export {VerificationScreen};
