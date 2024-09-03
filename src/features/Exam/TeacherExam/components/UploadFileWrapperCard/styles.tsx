import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 54,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary.base,
    borderStyle: 'dotted',
  },
});
