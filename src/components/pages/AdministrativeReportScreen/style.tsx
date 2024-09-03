import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {backgroundColor: Colors.white, padding: 16, flex: 1},
  BtnContainer: {
    justifyContent: 'space-around',
    paddingBottom: 16,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  card: {
    padding: 16,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    paddingTop: 32,
  },

  swipeUpContainerSoal: {
    backgroundColor: Colors.white,
  },
  swpTopContent: {
    padding: 16,
    paddingTop: 0,
  },
  rectangle: {
    backgroundColor: Colors.dark.neutral10,
    height: 4,
    marginVertical: '8%',
    width: '100%',
    padding: 0,
  },
  swpMiddleContent3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  soalSubContent: {
    flexDirection: 'column',
    width: '70%',
    marginBottom: '4%',
  },
  swpMiddleContentSoal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  swpTopTitle2Container: {alignItems: 'center'},
  swpTopTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    paddingBottom: 8,
    alignSelf: 'center',
  },
  swpSubTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  chips: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 4,
    alignSelf: 'flex-end',
    marginRight: 8,
    marginVertical: 16,
  },
  chipsText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    fontWeight: '400',
    textAlign: 'center',
  },
  selectAll: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
    paddingRight: 8,
  },
  showLess: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontWeight: '600',
    color: Colors.dark.neutral60,
    fontFamily: Fonts.SemiBoldPoppins,
    marginVertical: 16,
    marginHorizontal: 12,
  },
  swpBottomContentSoal: {
    marginHorizontal: 32,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  SoalButton: {
    width: '55%',
    marginHorizontal: '2%',
  },

  categoryName: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    paddingLeft: 8,
  },
  totalIncomeCategory: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    fontWeight: '600',
  },
  dot: {width: 11, height: 11, borderRadius: 30},
  totalPrice: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 1,
    color: Colors.primary.base,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryContainer: {
    marginTop: 24,
  },
  categoryItemLeft: {
    flexDirection: 'row',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  pieChart: {
    alignSelf: 'center',
  },
  contentContainerStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  swipeUpTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  svStyle: {
    maxHeight: 400,
  },
});
