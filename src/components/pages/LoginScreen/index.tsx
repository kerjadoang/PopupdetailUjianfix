import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import FormLogin from '@components/organism/FormLogin';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <FormLogin />
    </View>
  );
};

export {LoginScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  box: {
    alignItems: 'center',
    height: '80%',
  },
  title: {
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  boxTitle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  subTitle: {fontSize: 14, fontFamily: 'Poppins-Regular'},
});
