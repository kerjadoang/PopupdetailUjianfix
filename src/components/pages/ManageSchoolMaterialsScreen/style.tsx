import {Dimensions, StyleSheet} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

const window = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingTop: STATUSBAR_HEIGHT,
  },
  subContainer: {
    padding: 16,
    flexGrow: 1,
  },
  emptyDataContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 150,
  },
  notFoundTitle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    letterSpacing: 0.1,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  buttonNotFound: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonBottom: {
    paddingVertical: 8,
    paddingHorizontal: 56,
    width: '90%',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 16,
  },
  materialsContainer: {
    flexDirection: 'column',
  },
  classContaner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  subjectTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: '600',
    color: Colors.dark.neutral100,
    marginLeft: 8,
    alignSelf: 'center',
  },
  rectangle: {
    width: window.width,
    marginLeft: -16,
    height: 4,
    backgroundColor: Colors.dark.neutral10,
    marginBottom: 20,
  },
  swipeUpContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  swipeUpTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
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
  textSwipeUpAction: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    letterSpacing: 0.1,
    fontFamily: Fonts.RegularPoppins,
    paddingLeft: 13,
  },
  textSwipeUpActionLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    letterSpacing: 1,
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    paddingBottom: 20,
  },
  classText: {
    lineHeight: 20,
    paddingLeft: 10,
    textAlign: 'left',
    paddingBottom: 0,
    alignSelf: 'center',
  },
  bottomSwipeUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSwipeUp: {
    paddingVertical: 8,
    paddingHorizontal: 57,
    width: '50%',
  },
  stylesTitle: {
    fontSize: 14,
    lineHeight: 18,
  },
});
