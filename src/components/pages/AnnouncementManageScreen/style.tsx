import {StyleSheet} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerTab: {
    backgroundColor: Colors.white,
  },
  containerTabBarLabel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
});
