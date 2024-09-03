import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 12,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  noAnswer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAnswerTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    marginTop: 12,
    marginBottom: 6,
  },
  noAnswerDescription: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
  },
});
