import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Button, OTP} from '@components/atoms';
import Colors from '@constants/colors';
import Logo from '@assets/svg/maskot_7.svg';
import {CTimer} from '@components/atoms/CTimer/index';
interface Props {
  userType: string;
  propsData: any;
}
const FormLoginOTP: FC<Props> = ({propsData, userType}) => {
  return (
    <View style={styles.contentContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={{flex: 1}}>
          <Logo width={80} height={80} style={styles.maskotIcon} />

          <Text style={styles.title}>{'Verifikasi Kode OTP'}</Text>

          <Text style={styles.subtitle}>
            {
              'Masukkan 4 digit kode OTP yang sudah dikirim ke nomor 08124567890'
            }
          </Text>

          <View style={styles.otpContainer}>
            <OTP
              length={4}
              // errorMessage="Kode OTP salah. Silakan coba lagi."
            />
          </View>

          <CTimer
            bold
            containerStyle={styles.cTimer}
            time={60000}
            type={{
              minutes: true,
              seconds: true,
            }}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendTitle}>{'Tidak menerima OTP? '}</Text>

            <Pressable>
              <Text
                style={{...styles.resendTitle, color: Colors.dark.neutral50}}>
                {'Kirim ulang!'}
              </Text>
            </Pressable>
          </View>
        </View>
        <Button
          action={() => {
            propsData({
              selectUserType: userType,
              currentScreen: 'SuccessScreen',
            });
          }}
          label={'Lanjut'}
        />
      </ScrollView>
    </View>
  );
};

export default FormLoginOTP;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },

  maskotIcon: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  image: {
    width: 80,
    height: 80,
    backgroundColor: '#fff5cc',
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 24,
    alignSelf: 'center',
    width: '70%',
  },
  inputNote: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginBottom: 24,
  },

  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resendTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },

  otpContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cTimer: {
    alignSelf: 'center',
    marginBottom: 4,
  },
});
