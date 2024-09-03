import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconArrow from '@assets/svg/ic_arrow_right_blue.svg';

type Props = {
  title: string;
  subtitle: string;
  disabled: boolean;
  action: () => void;
};

const CardRaport = ({title, subtitle, disabled, action}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: disabled ? Colors.dark.neutral20 : Colors.white},
      ]}
      onPress={action}
      disabled={disabled}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <IconArrow width={24} height={24} />
    </TouchableOpacity>
  );
};
export {CardRaport};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '98%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    padding: 16,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
});
