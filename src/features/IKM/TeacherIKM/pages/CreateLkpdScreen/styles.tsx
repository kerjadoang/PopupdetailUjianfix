import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  cardContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    height: '100%',
  },
  swipeUpContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: 600,
  },
  swipeUpTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    marginBottom: 16,
  },
});
