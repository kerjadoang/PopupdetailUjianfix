import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentContainerStyleProfessions: {
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  max: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    color: Colors.dark.neutral60,
    letterSpacing: 0.25,
    fontSize: 12,
    lineHeight: 16,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 16,
  },
  button: {
    width: '100%',
  },
});
