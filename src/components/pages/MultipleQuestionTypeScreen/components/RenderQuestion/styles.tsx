import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

export default StyleSheet.create({
  textQuestion: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginTop: 4,
  },
  imageContainer: {
    borderRadius: 10,
    width: WINDOW_WIDTH - 32,
    overflow: 'hidden',
    marginVertical: 16,
  },
  labelQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  labelQuestion: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.dark.neutral50,
  },
  labelMarks: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.dark.neutral50,
  },
});
