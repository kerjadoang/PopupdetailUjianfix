import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  component: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  category: {
    marginBottom: 8,
    flexDirection: 'row',
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.primary.light3,
  },
  categoryTextItem: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
  },
  cardTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
  },
  cardSubTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    marginBottom: 4,
  },
  cardScheduleTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    marginBottom: 4,
  },
  cardScheduleDate: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral80,
  },
  cardScheduleTeacher: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  cardSedangBerlangsungText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.danger.base,
    marginLeft: 8,
  },
  cardRiwayatText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
  },
});

export const swipeUpStyle = StyleSheet.create({
  container: {
    margin: 16,
    gap: 24,
  },
  contentRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
});
