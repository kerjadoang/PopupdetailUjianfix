import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 16,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  dataCard: {
    flex: 1,
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.primary.light3,
    marginBottom: 8,
    marginRight: 8,
  },
  titleBadge: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 4,
  },
  cardDateTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    marginBottom: 16,
  },
  lineGrey: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.dark.neutral20,
  },
  cardCountDownContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCountDownTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  cardCountDownButton: {
    width: 80,
  },
  cardCountDownButton2: {
    paddingHorizontal: '5%',
  },
  onGoingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onGoingDotOutter: {
    height: 14,
    width: 14,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: Colors.danger.base,
    borderWidth: 2,
    marginRight: 8,
  },
  onGoingDotInner: {
    height: 12,
    width: 12,
    borderRadius: 25,
    backgroundColor: Colors.danger.base,
  },
  onGoingTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.danger.base,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  row: {
    flexDirection: 'row',
  },
  buttonContainer: {
    padding: 16,
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
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginBottom: 6,
  },
  noDataDescription: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    textAlign: 'center',
    marginBottom: 12,
  },
  noDataButton: {
    width: '35%',
  },
  swipeUpDateWrapper: {
    height: 300,
  },
  swipeUpDateHeaderTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
  },
  swipeUpDateButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  swipeUpButtonConfirm: {
    flex: 1,
  },
});
