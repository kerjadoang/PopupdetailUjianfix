import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  moreContainer: {
    backgroundColor: Colors.white,
    elevation: 4,
    borderRadius: 10,
    gap: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
});
