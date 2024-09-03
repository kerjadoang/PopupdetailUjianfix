import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    height: '100%',
  },
  selesaiButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.success.light1,
  },
  answerContainer: {flex: 1, marginTop: 16},
  titleText: {
    marginBottom: 8,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    color: Colors.dark.neutral50,
  },
});
