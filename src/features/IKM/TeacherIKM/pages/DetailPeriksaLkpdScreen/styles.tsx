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
  filterStudentActive: {
    width: '50%',
    borderBottomColor: Colors.primary.base,
    borderBottomWidth: 3,
    paddingBottom: 6,
  },
  filterStudentNonActive: {
    width: '50%',
    paddingBottom: 6,
  },

  titleFilterActive: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  titleFilterNonActive: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  btmbtn: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    alignSelf: 'center',
  },
  popUpFinishContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  textFinish: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    fontWeight: '600',
  },
});
