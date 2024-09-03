import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  containerCard: {
    flexDirection: 'row',
    gap: 2.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
  },
  errorBorder: {borderColor: 'red', borderStyle: 'solid', borderWidth: 1},
  check: {
    justifyContent: 'center',
  },
  swipeContainer: {
    margin: 16,
  },
  titleSwipe: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  btn: {
    borderColor: Colors.primary.base,
    borderWidth: 1.2,
    borderStyle: 'solid',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2 / 8,
  },
  cardSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  selectedKd: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  unselectedKd: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.black,
  },
  kdName: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
  },
  btmbtn: {
    width: '100%',
    alignSelf: 'center',
  },
  errorText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.danger.base,
  },
});
