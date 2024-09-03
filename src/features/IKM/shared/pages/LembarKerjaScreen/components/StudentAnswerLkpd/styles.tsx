import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {},
  swipeUpUpload: {
    padding: 16,
  },
  swipeUpHeaderTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginBottom: 16,
  },
  swipeUpUploadHeaderTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginBottom: 16,
  },
  swipeUpUploadLabel: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  swipeUpUploadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
