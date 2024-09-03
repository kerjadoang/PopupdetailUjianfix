import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import IconRight from '@assets/svg/ic16_chevron_right.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
const NavigateCard = ({title, onPress, icon}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <IconRight width={16} height={16} />
      </View>
    </TouchableOpacity>
  );
};

export default NavigateCard;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: Colors.primary.light3,
    marginRight: 16,
    borderRadius: 10,
    width: '48%',
  },
  left: {
    flexDirection: 'column',
    paddingRight: 12,
    width: window.width * 0.27,
  },
  title: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
    fontWeight: '600',
    paddingTop: 8,
    color: Colors.dark.neutral100,
  },
});
