/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  label: string;
  img: any;
  onPress?: () => void;
};

const CardPTN = ({label, img, onPress}: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
        <View style={styles.imgContainer}>{img}</View>
        <View>
          <Text style={styles.boldText}>{label}</Text>
        </View>
      </View>

      <View>
        <Icon name="chevron-right" size={16} color={Colors.primary.base} />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    gap: 16,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boldText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.black,
  },
  thinText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    color: Colors.dark.neutral60,
  },
  imgContainer: {},
});
export {CardPTN};
