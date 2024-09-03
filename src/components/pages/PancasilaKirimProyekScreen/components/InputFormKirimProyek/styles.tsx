import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {},
  inputForm: {
    marginBottom: 24,
  },
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
  error: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
    color: Colors.danger.base,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
    marginTop: 8,
  },
  textButton: {
    width: '90%',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    color: Colors.dark.neutral50,
    letterSpacing: 0.1,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.dark.neutral20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 30,
  },
});
