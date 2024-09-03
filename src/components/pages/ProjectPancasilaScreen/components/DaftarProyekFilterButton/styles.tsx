import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  textBtn: {
    color: Colors.primary.base,
    fontFamily: Fonts.BoldPoppins,
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 22,
  },
});
