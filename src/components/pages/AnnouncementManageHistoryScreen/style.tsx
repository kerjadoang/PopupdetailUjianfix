import {StyleSheet} from 'react-native';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  textRegular: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  textBold: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  swipeUpItemTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
  swipeUpItemText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  swipeUpItemSubText: {
    borderRadius: 30,
    color: Colors.primary.base,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  swipeUpItemContentSwipe: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
    columnGap: 8,
    rowGap: 16,
  },
  swipeUpItemChipContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  dateContainerText: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: Colors.dark.neutral10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
