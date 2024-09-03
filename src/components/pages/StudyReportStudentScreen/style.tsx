import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  unChoose: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 30,
    marginRight: 8,
  },
  choose: {
    backgroundColor: Colors.primary.base,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 30,
    marginRight: 8,
  },
  textUnchoose: {
    fontFamily: Fonts.RegularPoppins,
    lineHeight: 18,
    color: Colors.dark.neutral80,
    textAlign: 'center',
    letterSpacing: 0.25,
    fontSize: 14,
    fontWeight: '400',
  },
  textChoose: {
    fontFamily: Fonts.SemiBoldPoppins,
    lineHeight: 18,
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: 0.25,
    fontSize: 14,
    fontWeight: '600',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    margin: 16,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginRight: 5,
  },
  subTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
    marginBottom: 4,
    fontWeight: '400',
  },
  bulletGreen: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: Colors.success.base,
    marginRight: 6,
  },
  bulletRed: {
    width: 12,
    height: 12,
    borderRadius: 100,
    marginRight: 6,
    backgroundColor: Colors.danger.base,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainerSwipe: {
    padding: 10,
  },
  contentSwipe: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSwipe: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    letterSpacing: 0.25,
    color: '#1D252D',
    marginRight: 5,
    textAlign: 'center',
  },
  textBlue: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    marginRight: 5,
  },
  date: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    letterSpacing: 0.25,
    marginRight: 5,
    color: Colors.dark.neutral100,
  },
  list: {
    borderTopWidth: 4,
    margin: 5,
    borderColor: '#F5F7F9',
    padding: 10,
  },
});
