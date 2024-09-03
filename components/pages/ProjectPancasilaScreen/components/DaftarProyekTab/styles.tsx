import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingBottom: 60,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    width: '40%',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 22,
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    fontWeight: '600',
  },
});
