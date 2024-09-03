import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  lessonPresentastionContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  lessonProgressContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonTitleContainer: {flex: 5, justifyContent: 'center', paddingLeft: '5%'},
  lessonTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral50,
  },
  lessonTitle2: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginTop: '1%',
  },
  lessonArrowContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingEnd: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
