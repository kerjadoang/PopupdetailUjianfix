import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  headerIcon: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  contentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  swipeUpContainer: {
    padding: 16,
    // backgroundColor: 'red'
  },
  swipeUpHeadTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 16,
    textAlign: 'center',
  },
  swipeUpCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swipeUpCardIcon: {
    borderRadius: 50,
    width: 46,
    height: 46,
    marginRight: 16,
  },
  swipeUpTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  swipeUpDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.RegularPoppins,
  },
  swipeUpLine: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.dark.neutral20,
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
  },
});
