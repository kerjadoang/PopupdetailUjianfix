import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  primaryContainer: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: Colors.primary.background,
    borderRadius: 15,
  },
  boldText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  regularText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
  },
});
