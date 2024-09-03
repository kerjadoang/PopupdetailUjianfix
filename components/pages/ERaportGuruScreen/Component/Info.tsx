import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InfoIcon from '@assets/svg/ic_information.svg';
import Colors from '@constants/colors';

const Info = () => {
  return (
    <View style={s.container}>
      <InfoIcon style={s.icon} />
      <Text>Pilih Murid untuk membagikan e-rapor.</Text>
    </View>
  );
};
const s = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 12,
    marginTop: 8,
  },
  icon: {
    marginRight: 10,
  },
});

export {Info};
