import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  cardContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    height: '100%',
  },
  detailContainer: {
    marginVertical: 16,
    borderTopColor: Colors.dark.neutral10,
    borderBottomColor: Colors.dark.neutral10,
    borderTopWidth: 4,
    borderBottomWidth: 4,
  },
  headerDetail: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleDetail: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.black,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  titleData: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral60,
    fontFamily: Fonts.RegularPoppins,
  },
  item: {
    marginVertical: 8,
  },
});
