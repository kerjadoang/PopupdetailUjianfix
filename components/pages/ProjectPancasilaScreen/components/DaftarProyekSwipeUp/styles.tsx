import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {},
  title: {
    fontFamily: Fonts.BoldPoppins,
    textAlign: 'center',
    fontSize: 20,
    color: Colors.black,
  },
  headerSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
  },
  selectAll: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.primary.base,
  },
  contentSwipe: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 25,
    marginBottom: 10,
    marginRight: 12,
    // width: WINDOW_WIDTH * 0.2,
    alignItems: 'center',
  },
  chipText: {
    fontFamily: Fonts.RegularPoppins,
  },
});
