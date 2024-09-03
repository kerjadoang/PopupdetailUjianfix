import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {},
  emptyStateContainer: {marginTop: 32},
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    fontSize: 18,
    lineHeight: 24,
  },
  lihatSemua: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
    fontSize: 12,
    lineHeight: 16,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.base,
  },
});
