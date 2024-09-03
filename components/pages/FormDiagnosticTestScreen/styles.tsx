import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    padding: 16,
    paddingBottom: 30,
  },
  itemData: {
    marginBottom: 16,
  },
  label: {
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
  },
  btnItem: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
    paddingHorizontal: 16,
    paddingVertical: 8.98,
  },
  btnItemLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral80,
    textAlign: 'center',
  },
  btnItemActive: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary.base,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnItemLabelActive: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  blueText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  btmbtnContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  helperText: {
    marginTop: 4,
    color: Colors.danger.base,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Poppins-Regular',
  },
  titleSwipe: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.black,
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
  },
  domicileBtn: {
    borderRadius: 25,
    backgroundColor: Colors.dark.neutral10,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  domicileBtnText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
});
