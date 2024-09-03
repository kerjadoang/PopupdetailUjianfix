import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import {generalStyles} from '@constants/styles';

export default StyleSheet.create({
  container: {
    ...generalStyles.shadowProp,
    paddingVertical: 26,
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
