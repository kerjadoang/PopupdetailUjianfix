import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import Fonts from '@constants/fonts';

interface Iprops {
  onPress: any;
}
const SubmitCard = (props: Iprops) => {
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Text style={styles.title}>Apa yang anda cari telah sesuai ?</Text>
      <Text style={styles.label}>
        kamu bisa memilih kembali jurusan yang lebih sesuai dengan keinginanmu.
      </Text>
      <Button
        label="Selesai"
        outline
        style={styles.button}
        action={props?.onPress}
      />
    </View>
  );
};

export default SubmitCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    marginBottom: 16,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
  },
  button: {
    width: '100%',
    marginTop: 8,
    paddingVertical: 3,
  },
  title: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    color: Colors.dark.neutral100,
  },
  label: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    color: Colors.dark.neutral100,
  },
});
