import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  labelContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    alignSelf: 'center',
  },
  label: {
    fontWeight: '600',
    width: '60%',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  subLabel: {
    width: '60%',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 11,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
  icon: {
    height: 15,
    width: 15,
  },
  iconRight: {
    position: 'absolute',
    right: 0,
  },
  iconLeft: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
});
