import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  playContainer: {
    backgroundColor: Colors.primary.base,
    borderRadius: 25,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    marginLeft: 6,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginVertical: 2,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },

  noDataContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataIcon: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  noDataTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginBottom: 6,
  },
  noDataSubtitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    textAlign: 'center',
  },
  noDataButton: {
    width: '30%',
  },
});
