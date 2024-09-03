import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {},
  popUpDoneTopInnerContainerStyle: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  popUpDoneStripLeftContainerStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.success.base,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
  },
  popUpDoneTrueStyle: {
    fontFamily: 'Poppins-Regular',
    color: Colors.success.base,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    marginTop: 5,
  },
  popUpDoneStripMiddleStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.danger.base,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
  },
  popUpDoneFalseStyle: {
    fontFamily: 'Poppins-Regular',
    color: Colors.danger.base,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    marginTop: 5,
  },
  popUpDoneStripRightStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral60,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
  },
  popUpDoneSkipStyle: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    marginTop: 5,
  },
  popUpDoneSeparator1: {
    width: '80%',
    borderTopWidth: 0.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
