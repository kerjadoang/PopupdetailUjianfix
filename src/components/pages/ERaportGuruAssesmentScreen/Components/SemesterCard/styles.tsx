import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  cardSemester: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 9,
  },
  textSemester: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
  textSemesterActive: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
});
