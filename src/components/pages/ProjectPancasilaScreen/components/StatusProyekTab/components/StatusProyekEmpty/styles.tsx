import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {},
  emptyStateContainer: {
    alignItems: 'center',
    height: 295,
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    marginBottom: 6,
  },
  emptyStateSubTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    textAlign: 'center',
  },
});
