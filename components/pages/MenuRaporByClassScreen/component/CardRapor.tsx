import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import IconGenapAva from '@assets/svg/genap_blue.svg';
import IconGenapNonAva from '@assets/svg/genap_grey.svg';
import IconGanjilAva from '@assets/svg/ganjil_blue.svg';
import IconGanjilNonAva from '@assets/svg/ganjil_grey.svg';
import BlueArrow from '@assets/svg/ic_arrow_right_blue.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

type Props = {
  isGanjil: boolean;
  isAvailable: boolean;
  action: () => void;
};

const CardRaport = ({isGanjil = true, isAvailable = true, action}: Props) => {
  return (
    <TouchableOpacity
      onPress={action}
      disabled={isAvailable ? false : true}
      style={
        isAvailable
          ? styles.container
          : [styles.container, {backgroundColor: Colors.dark.neutral10}]
      }>
      {isGanjil ? (
        <View>{isAvailable ? <IconGanjilAva /> : <IconGanjilNonAva />}</View>
      ) : (
        <View>{isAvailable ? <IconGenapAva /> : <IconGenapNonAva />}</View>
      )}
      <View style={{flex: 1, marginHorizontal: 12}}>
        <Text style={styles.label}>
          {isGanjil ? 'Rapor Semester Ganjil' : 'Rapor Semester Genap'}
        </Text>
        {isAvailable ? null : <Text>Rapor belum tersedia</Text>}
      </View>
      <View>{isAvailable ? <BlueArrow /> : null}</View>
    </TouchableOpacity>
  );
};
export {CardRaport};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    backgroundColor: Colors.primary.light3,
    marginVertical: 4,
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
});
