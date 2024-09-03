import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Button} from '@components/atoms';

interface Iprops {
  actionDone: any;
  actionAnother: any;
}
const RecommendationCard = (props: Iprops) => {
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Text style={styles.title}>Apa rekomendasi telah sesuai ?</Text>
      <Text style={styles.label}>
        kamu bisa memilih kembali jurusan yang lebih sesuai dengan keinginanmu.
      </Text>
      <View style={styles.bottomContainer}>
        <Button
          label="Selesai"
          outline
          action={props?.actionDone}
          style={styles.button}
        />
        <Button
          label="Jurusan Lain"
          action={props?.actionAnother}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export {RecommendationCard};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'column',
    backgroundColor: Colors.white,
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
  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    lineHeight: 22,
  },
  label: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    lineHeight: 16,
    paddingTop: 4,
  },
  bottomContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8,
  },
  button: {
    marginHorizontal: 4,
    width: '48%',
  },
});
