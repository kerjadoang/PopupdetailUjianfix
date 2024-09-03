import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {},
  title: {
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
  },
  imageProfile: {
    width: 64,
    height: 64,
    borderRadius: 100,
    borderWidth: 3,
    backgroundColor: Colors.white,
    borderColor: Colors.primary.light1,
  },
  infoProfile: {justifyContent: 'center', marginLeft: 8},
});
