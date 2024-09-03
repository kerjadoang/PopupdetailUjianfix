import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {},
  explanationTitleText: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  explanationAnswerText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.success.base,
  },
});
