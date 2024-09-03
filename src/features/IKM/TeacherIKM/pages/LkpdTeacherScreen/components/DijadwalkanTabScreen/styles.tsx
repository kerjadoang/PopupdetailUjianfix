import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {margin: 16},
  pv16: {
    paddingVertical: 16,
  },
  filterContainer: {
    height: 32,
    gap: 8,
  },
  shadowFooter: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
