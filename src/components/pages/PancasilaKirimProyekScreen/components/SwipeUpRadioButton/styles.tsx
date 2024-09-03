import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

export default StyleSheet.create({
  container: {},
  swipeUpContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    maxHeight: WINDOW_HEIGHT * 0.5,
  },
  swipeUpTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    textAlign: 'center',
    letterSpacing: 0.1,
    marginBottom: 16,
  },
  swipeUpDataContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueSwipeUp: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    letterSpacing: 0.1,
  },
  textType: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
    color: Colors.dark.neutral60,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
  },
});
