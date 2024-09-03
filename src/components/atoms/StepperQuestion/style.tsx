import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  buttonPassive: {
    borderRadius: 20,
    width: 32,
    height: 32,
    backgroundColor: Colors.white,
    borderColor: Colors.dark.neutral20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correct: {
    borderColor: Colors.success.base,
  },
  incorrect: {
    borderColor: Colors.danger.base,
  },
  filled: {
    borderColor: Colors.primary.base,
  },
  bookmarked: {
    borderColor: Colors.bookmark.light1,
    backgroundColor: Colors.bookmark.light1,
  },
  textCorrect: {
    color: Colors.success.base,
  },
  textIncorrect: {
    color: Colors.danger.base,
  },
  textFilled: {
    color: Colors.primary.base,
  },
  textBookmarked: {
    color: Colors.bookmark.dark1,
  },
  buttonActive: {
    borderRadius: 20,
    width: 32,
    height: 32,
    backgroundColor: Colors.primary.base,
    borderColor: Colors.primary.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelPasive: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral60,
  },
  labelActive: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.white,
  },
  buttonPlus: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonLeftPlus: {
    backgroundColor: Colors.primary.light1,
    borderRadius: 10,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  error: {
    position: 'absolute',
    right: 2,
    top: -2,
  },
});
