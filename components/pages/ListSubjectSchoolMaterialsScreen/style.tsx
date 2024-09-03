import {StyleSheet} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  subContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  infoHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
    padding: 12,
  },
  iconInfo: {
    marginRight: 10,
  },
  textInfo: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    padding: 16,
    width: '100%',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 4,
  },
  subjectTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    textAlign: 'left',
    letterSpacing: 0.1,
    marginVertical: 16,
  },
  titleButton: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'left',
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.dark.neutral20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 30,
  },
  inputForm: {
    marginBottom: 24,
  },
  textButton: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    color: Colors.dark.neutral50,
    letterSpacing: 0.1,
    fontFamily: Fonts.SemiBoldPoppins,
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
  rectangle: {
    height: 4,
    backgroundColor: Colors.dark.neutral10,
    marginTop: -6,
  },
  materialsContainer: {
    marginTop: 16,
  },
  materialsTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    paddingBottom: 8,
  },
  inputText: {
    backgroundColor: Colors.dark.neutral10,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.1,
    height: 40,
    marginBottom: 24,
  },
  textType: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
    color: Colors.dark.neutral60,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
  },
  buttonAddMaterials: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonBottom: {
    paddingVertical: 8,
    paddingHorizontal: 56,
    width: '100%',
  },
  bottomSwipeUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSwipeUp: {
    paddingVertical: 8,
    width: '50%',
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
});
