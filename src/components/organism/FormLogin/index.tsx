import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Button, InputText, PopUp} from '@components/atoms';
import useFormLogin from './useFormLogin';
import {useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {Header} from '@components/atoms/Header';
import {ScrollView} from 'react-native';
import Robot from '@assets/svg/robot_cs.svg';
import Avatar from '@components/atoms/Avatar';
import RobotSad from '@assets/svg/robot_sedih.svg';

const FormLogin = () => {
  const route = useRoute();
  const {fullname, rolename, avatar}: any = route?.params;
  const [show, setShow] = useState(false);
  const {
    valid,
    form,
    handleuserChange,
    submit,
    isDisable,
    submitForgot,
    message,
    alert,
    popUp,
    setPopUp,
    openWhatsApp,
    popUpSSO,
    setPopUpSSO,
  } = useFormLogin();

  return (
    <View style={styles.form}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.FormLogin}>
          <Avatar id={avatar} style={styles.imageStyle} />
          <Text style={styles.title}>Halo {fullname}!</Text>
          <Text style={styles.subTitle}>
            Kamu terdaftar sebagai{' '}
            <Text style={[styles.subTitle, {fontWeight: 'bold'}]}>
              {rolename}
            </Text>{' '}
            Masukkan kata sandi untuk mulai belajar bersama Kelas Pintar.
          </Text>
          <InputText
            maskEntry
            label="Kata Sandi"
            disabled={isDisable}
            secure
            error={valid === true ? true : false}
            backgroundColor={Colors.dark.neutral10}
            errorMessage={message}
            placeholder=""
            onPressIcon={() => setShow(!show)}
            value={form?.password}
            onChangeText={handleuserChange}
          />
          {alert ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.alert}>Lupa kata sandi? </Text>
              <Text
                onPress={submitForgot}
                style={[styles.alert, {fontWeight: 'bold'}]}>
                Klik disini.
              </Text>
            </View>
          ) : null}
        </View>

        <View>
          <Button
            action={submit}
            background={
              !isDisable ? Colors.primary.base : Colors.dark.neutral50
            }
            isDisabled={isDisable}
            bottom={10}
            label="Masuk"
            color={!isDisable ? Colors.white : Colors.dark.neutral80}
          />
          <Button
            action={() => submitForgot(form?.username)}
            label="Lupa Kata Sandi ?"
            background={Colors.white}
            color={Colors.dark.neutral60}
          />
        </View>
        <PopUp
          show={popUp}
          close={() => setPopUp(false)}
          Icon={Robot}
          title={'Lupa Kata Sandi?'}
          desc={
            'Hubungi Customer Service Kelas Pintar untuk membuat kata sandi baru.'
          }
          titleConfirm={'Hubungi CS'}
          actionConfirm={() => {
            setPopUp(false);
            openWhatsApp();
          }}
        />
        <PopUp
          show={popUpSSO}
          close={() => setPopUpSSO(false)}
          Icon={RobotSad}
          title={'Oops! Kamu tidak bisa login saat ini'}
          styleTitle={{textAlign: 'center'}}
          desc={
            'Sepertinya kamu sudah masuk dari perangkat atau browser lain.\nSilakan keluar dari sesi lain sebelum mencoba masuk kembali.'
          }
          titleConfirm={'Tutup'}
          actionConfirm={() => {
            setPopUpSSO(false);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default FormLogin;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageStyle: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  scrollView: {
    justifyContent: 'space-between',
    flexGrow: 1,
    padding: 16,
  },
  FormLogin: {
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    textAlign: 'center',
    color: Colors.dark.neutral60,
  },
  subTitle: {
    fontFamily: 'Poppins-regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
  alert: {
    fontFamily: 'Poppins-regular',
    fontSize: 14,
    marginBottom: 32,
    color: Colors.danger.base,
  },
});
