import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

type Props = {
  label: String;
};

const CardFeaturesPackage = ({label}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/greenCheck.png')}
        style={styles.icon}
      />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontFamily: Fonts.LightPoppins,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    paddingHorizontal: '2%',
    color: Colors.black,
    letterSpacing: 0.25,
    width: '90%',
  },
});

export default CardFeaturesPackage;
