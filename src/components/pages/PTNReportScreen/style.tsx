import {StyleSheet} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

export default StyleSheet.create({
  headerBackground: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.primary.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
  },
  tabContent: {
    backgroundColor: 'transparent',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
  },
  tabBarIndicator: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 4,
    backgroundColor: Colors.primary.base,
  },
  tabBarLabel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
});
