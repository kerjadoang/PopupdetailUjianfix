import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {},
  swipeUpChooseDateWrapper: {
    height: 320,
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
  swipeUpDateHeaderTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginBottom: 16,
  },
  swipeUpChooseDateHeaderTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginBottom: 16,
  },
  swipeUpDateContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  swipeUpDateButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  swipeUpChooseDateButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  swipeUpButtonConfirm: {
    flex: 1,
  },
});
