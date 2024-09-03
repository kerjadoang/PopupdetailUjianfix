import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  cardContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    backgroundColor: Colors.white,
    paddingBottom: 32,
    height: '100%',
  },
  explanationTitleText: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  explanationCorrectAnswerText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 18,
    color: Colors.success.base,
  },
  bottomSheetHandle: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'transparent',
    opacity: 0.1,
    shadowOpacity: 0.5,
    shadowRadius: 40,
    shadowOffset: {
      height: -4,
      width: 0,
    },
  },
  bottomSheetBackground: {
    backgroundColor: Colors.white,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
