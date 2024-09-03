import {StyleSheet} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerTab: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  containerTabBarLabel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
  // BEGIN MyTabContentItemNotFound
  containerTabContentItemNotFound: {
    flex: 1,
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTabContentItemNotFoundTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
  containerTabContentItemNotFoundDescription: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
  },
  // END MyTabContentItemNotFound //
  // BEGIN Search
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  containerSearchCancelLabel: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primary.base,
  },
  // END Search //
  // BEGIN SwipeUpMapelItem
  swipeUpMapelItemTitle: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 20,
  },
  swipeUpMapelItemHeaderSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swipeUpMapelItemText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  swipeUpMapelItemSubText: {
    borderRadius: 30,
    color: Colors.primary.base,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontFamily: 'Poppins-Bold',
  },
  swipeUpMapelItemContentSwipe: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
    gap: 5,
  },
  swipeUpMapelItemChipContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  swipeUpMapelItemShowLess: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontWeight: '600',
    color: Colors.dark.neutral60,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  // END SwipeUpMapelItem //
  // BEGIN SwipeUpKerjakanItem
  swipeUpKerjakanItemTextRegular: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  swipeUpKerjakanItemTextSemiBold: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  // END SwipeUpKerjakanItem //
});
