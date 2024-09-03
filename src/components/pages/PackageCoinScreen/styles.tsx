import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: Colors.white,
  },
  bgBlueOrnament: {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: Colors.primary.background,
  },
  styleLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.BoldPoppins,
    lineHeight: 24,
    color: Colors.dark.neutral80,
    paddingBottom: 8,
  },
  listCoinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
    borderRadius: 10,
  },
  coinTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.BoldPoppins,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    paddingLeft: 12,
  },
  priceBeforeDiscount: {
    textDecorationLine: 'line-through',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    lineHeight: 16,
    color: Colors.dark.neutral60,
  },
  priceAfterDiscount: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    lineHeight: 22,
    color: Colors.dark.neutral100,
  },
});
