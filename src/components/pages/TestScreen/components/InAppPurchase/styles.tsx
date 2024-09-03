import {StyleSheet} from 'react-native';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  labelContainer: {flexDirection: 'row'},
  button: {width: '30%', marginTop: 12},
  titleLabel: {fontFamily: Fonts.SemiBoldPoppins},
  descriptionLabel: {fontSize: 12},
});
