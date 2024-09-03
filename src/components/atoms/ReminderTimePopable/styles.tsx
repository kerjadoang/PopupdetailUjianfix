import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  popableContainer: {
    width: 234,
    borderRadius: 5,
  },
  popableContentContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
  },
  popableText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    color: Colors.danger.base,
  },
  subLabel: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
});
