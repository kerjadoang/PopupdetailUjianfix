import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {},
  titleButton: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
    color: Colors.dark.neutral100,
    letterSpacing: 0.1,
    fontFamily: Fonts.RegularPoppins,
    marginBottom: 8,
  },
  textInput: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  inputContainer: {
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 120,
    backgroundColor: Colors.dark.neutral10,
  },
});
